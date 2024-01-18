import { supabase } from "./supabase";
// API helper functions that handle database operations

export const GetAllTransactions = async () => {
  const { data, error } = await supabase.from("transactions").select("*");
  return { data, error };
};

export const getTransactionById = async (id: string) => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
};

export const deleteTransactionById = async (id: string) => {
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  return { error };
};

export const addNewTransaction = async (
  title: string,
  amount: number,
  description?: string
) => {
  const { data, error } = await supabase
    .from("transactions")
    .insert([{ title: title, amount: amount, description: description }])
    .select();

  return { data, error };
};

export const editTransaction = async (
  id: string,
  title: string,
  amount: number,
  description?: string
) => {
  const { data, error } = await supabase
    .from("transactions")
    .update({ title: title, amount: amount, description: description })
    .eq("id", id)
    .select();

  return { data, error };
};
