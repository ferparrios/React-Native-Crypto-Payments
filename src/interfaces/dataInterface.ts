export interface SelectedCoinProps {
  name: string | undefined
  image: string | undefined
}

export interface FormData {
  expected_output_amount: string;
  input_currency: string;
  notes: string;
}


export interface InfoData {
  identifier:         string;
  reference:          null;
  created_at:         string;
  edited_at:          string;
  status:             string;
  fiat_amount:        number;
  crypto_amount:      number;
  unconfirmed_amount: number;
  confirmed_amount:   number;
  currency_id:        string;
  merchant_device_id: number;
  merchant_device:    string;
  address:            string;
  tag_memo:           string;
  url_ko:             null;
  url_ok:             null;
  url_standby:        null;
  expired_time:       string;
  good_fee:           boolean;
  notes:              string;
  rbf:                boolean;
  safe:               boolean;
  fiat:               string;
  language:           string;
  percentage:         number;
  received_amount:    number;
  balance_based:      string;
  internal_data:      null;
  transactions:       any[];
}


export interface Currencies {
  symbol?:     string;
  name?:       string;
  min_amount?: string;
  max_amount?: string;
  image?:      string;
  blockchain?: string;
}

