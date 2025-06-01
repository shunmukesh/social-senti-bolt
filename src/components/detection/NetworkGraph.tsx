import React, { useEffect, useRef } from 'react'
import { Account } from '../../types'
import * as d3 from 'd3'

interface NetworkGraphProps {
  account: Account
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ account }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    if (!svgRef.current) return
    
    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove()
    
    // Set up dimensions
    const width = 500
    const height = 300
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
    
    // Create nodes data
    // Add central account node and its connections
    const nodes = [
      { id: account.id, name: account.username, platform: account.platform, isMainAccount: true, suspiciousScore: 1 },
      ...account.networkConnections.map(conn => ({
        id: conn.accountId,
        name: conn.username,
        platform: conn.platform,
        isMainAccount: false,
        suspiciousScore: conn.suspiciousScore
      }))
    ]
    
    // Create links data
    const links = account.networkConnections.map(conn => ({
      source: account.id,
      target: conn.accountId,
      connectionType: conn.connectionType
    }))
    
    // Add some second-level connections to make the graph more interesting
    if (account.networkConnections.length > 1) {
      // Connect some of the first-level connections to each other
      for (let i = 0; i < account.networkConnections.length - 1; i++) {
        if (Math.random() > 0.3) { // 70% chance to add a connection
          links.push({
            source: account.networkConnections[i].accountId,
            target: account.networkConnections[i + 1].accountId,
            connectionType: 'Interaction'
          })
        }
      }
    }
    
    // Create simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30))
    
    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d: any) => d.connectionType === 'Follower' || d.connectionType === 'Following' ? 1 : 2)
      .attr('stroke-dasharray', (d: any) => d.connectionType === 'Interaction' ? '5,5' : null)
    
    // Create node groups
    const node = svg.append('g')
      .selectAll('.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any)
    
    // Add circles to nodes
    node.append('circle')
      .attr('r', (d: any) => d.isMainAccount ? 15 : 10)
      .attr('fill', (d: any) => {
        if (d.isMainAccount) return '#2563EB'
        
        // Color based on suspiciousness score
        if (d.suspiciousScore > 0.8) return '#EF4444'
        if (d.suspiciousScore > 0.5) return '#F59E0B'
        return '#10B981'
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
    
    // Add platform indicators
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('fill', 'white')
      .attr('font-size', (d: any) => d.isMainAccount ? '10px' : '8px')
      .attr('font-weight', 'bold')
      .text((d: any) => d.platform.charAt(0))
    
    // Add labels
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', (d: any) => d.isMainAccount ? 28 : 22)
      .attr('fill', 'currentColor')
      .attr('font-size', '11px')
      .text((d: any) => `@${d.name.substring(0, 12)}${d.name.length > 12 ? '...' : ''}`)
    
    // Add tooltips
    node.append('title')
      .text((d: any) => `@${d.name} (${d.platform})
Suspicious Score: ${(d.suspiciousScore * 100).toFixed(0)}%`)
    
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)
      
      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
    })
    
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }
    
    function dragged(event: any) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }
    
    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }
    
    return () => {
      simulation.stop()
    }
  }, [account])
  
  return (
    <div className="w-full overflow-x-auto border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 bg-white dark:bg-neutral-800">
      <svg ref={svgRef} className="w-full" style={{ minWidth: '500px', height: '300px' }}></svg>
      <div className="flex items-center justify-center gap-4 mt-2 text-xs text-neutral-600 dark:text-neutral-400">
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-primary-600"></span>
          <span>Main Account</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-error-500"></span>
          <span>High Risk ({'>'}80%)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-warning-500"></span>
          <span>Medium Risk (50-80%)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-success-500"></span>
          <span>Low Risk ({'<'}50%)</span>
        </div>
      </div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center mt-2">
        Drag nodes to explore connections. Hover for details.
      </p>
    </div>
  )
}

export default NetworkGraph