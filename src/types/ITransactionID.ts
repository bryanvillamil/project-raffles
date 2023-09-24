export interface IDataTransactionID {
  data: Data;
  meta: Meta;
}

export interface Data {
  id:                  string;
  created_at:          string;
  amount_in_cents:     number;
  reference:           string;
  currency:            string;
  payment_method_type: string;
  payment_method:      PaymentMethod;
  redirect_url:        string;
  status:              string;
  status_message:      string;
  merchant:            Merchant;
  taxes:               any[];
  tip_in_cents:        null;
}

export interface Merchant {
  name:          string;
  legal_name:    string;
  contact_name:  string;
  phone_number:  string;
  logo_url:      null;
  legal_id_type: string;
  email:         string;
  legal_id:      string;
}

export interface PaymentMethod {
  type:         string;
  extra:        Extra;
  phone_number: string;
}

export interface Extra {
  is_three_ds:         boolean;
  transaction_id:      string;
  external_identifier: string;
}

export interface Meta {
}