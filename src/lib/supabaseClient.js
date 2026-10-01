import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kvvaklvtbkexiydofrix.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ETSBn_WKFeHAjmaZIpr9lg_oom7f6Jy';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
