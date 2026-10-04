import { createClient } from '@supabase/supabase-js';

// Must be exactly this URL with https:// and .co
const supabaseUrl = 'https://iczznykbnumbgppudkoq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljenpueWtibnVtZ2JwcHVka29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExMTMxMTMsImV4cCI6MjEwNjY4OTExM30.DHH8t00OcKPmVCD6v1Ijh0gEnE8gDDeGeGhDPuRwh5Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);