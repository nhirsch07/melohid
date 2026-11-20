
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://geikgqsfbnjshwpcgsva.supabase.co';

const supabaseKey = 'sb_publishable_nTFVp2LFvjnLAIAqYVMUmA_PWAcB0Um';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
