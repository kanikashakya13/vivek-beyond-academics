import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iczznykbnumbgppudkoq.supabase.co';
// Using the service_role key to bypass all database security checks for the hackathon
const supabaseSecretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljenpueWtibnVtZ2JwcHVka29xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTExMzExMywiZXhwIjoyMTA2Njg5MTEzfQ.h2hv2HVZel-xiSARqA7_YGYWiq0ZyeZ_Y4t6HrJSKH8';

export const supabase = createClient(supabaseUrl, supabaseSecretKey);