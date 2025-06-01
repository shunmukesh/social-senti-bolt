import { createClient } from '@supabase/supabase-js';
import { Account, FakeAccountReport } from '../../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function saveDetectedAccount(account: Account) {
  try {
    const { data, error } = await supabase
      .from('detected_accounts')
      .insert(account)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving detected account:', error);
    throw error;
  }
}

export async function updateAccountStatus(
  accountId: string, 
  status: Account['status'],
  verifiedBy: string
) {
  try {
    const { data, error } = await supabase
      .from('detected_accounts')
      .update({ 
        status,
        verifiedBy,
        verifiedAt: new Date().toISOString()
      })
      .eq('id', accountId)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating account status:', error);
    throw error;
  }
}

export async function saveReport(report: FakeAccountReport) {
  try {
    const { data, error } = await supabase
      .from('reports')
      .insert(report)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving report:', error);
    throw error;
  }
}

export async function updateReportStatus(
  reportId: string,
  status: FakeAccountReport['status'],
  platformResponse?: string
) {
  try {
    const { data, error } = await supabase
      .from('reports')
      .update({
        status,
        platformResponse,
        resolutionDate: status === 'Actioned' || status === 'Denied' 
          ? new Date().toISOString()
          : null
      })
      .eq('id', reportId)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating report status:', error);
    throw error;
  }
}

export async function getAccountNetworkConnections(accountId: string) {
  try {
    const { data, error } = await supabase
      .from('network_connections')
      .select(`
        *,
        connected_account:detected_accounts(*)
      `)
      .eq('account_id', accountId);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching network connections:', error);
    throw error;
  }
}

// Real-time subscriptions
export function subscribeToAccountUpdates(callback: (account: Account) => void) {
  const subscription = supabase
    .channel('account_updates')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'detected_accounts'
      },
      (payload) => callback(payload.new as Account)
    )
    .subscribe();
    
  return () => {
    subscription.unsubscribe();
  };
}

export function subscribeToReportUpdates(callback: (report: FakeAccountReport) => void) {
  const subscription = supabase
    .channel('report_updates')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'reports'
      },
      (payload) => callback(payload.new as FakeAccountReport)
    )
    .subscribe();
    
  return () => {
    subscription.unsubscribe();
  };
}