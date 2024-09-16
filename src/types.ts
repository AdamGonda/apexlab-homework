// SCHEMA for Trade from https://developers.ccdata.io/documentation/legacy-websockets/Trade

export type Trade = {
  TYPE: string; // "0" for trade type messages
  M: string; // Market or exchange (e.g., Coinbase, Kraken)
  FSYM: string; // From asset (base symbol, e.g., BTC)
  TSYM: string; // To asset (quote/counter symbol, e.g., USD)
  F: string; // Trade flag (e.g., &1 for SELL, &2 for BUY)
  ID: string; // Trade ID
  TS: number; // Timestamp in seconds
  Q: number; // Volume of base asset (e.g., BTC)
  P: number; // Price in quote asset (e.g., USD)
  TOTAL: number; // Total value (Q * P)
  RTS: number; // Received timestamp in seconds
  CCSEQ: number; // Internal sequence number
  TSNS: number; // Nanosecond part of the reported timestamp
  RTSNS: number; // Nanosecond part of the received timestamp
};

export type AlertRule = {
  name: string
  condition: (price: number, quantity: number, total: number) => boolean
  color: string
}