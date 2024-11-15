import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient

  constructor() {

    const SUPABASE_URL = 'https://xhpkahiihznmsmradgca.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhocGthaGlpaHpubXNtcmFkZ2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NDMyNTQsImV4cCI6MjA0NzAxOTI1NH0.-xojWLTKGur0paiSWaJg3erRHZCrCwjNeWJVwL8q_Ho';
   this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
   }
   getClient() {
    return this.supabase;
  }
 
}
