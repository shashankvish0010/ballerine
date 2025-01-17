import { TransactionDirection, PaymentMethod, TransactionRecordType } from '@prisma/client';
import { AggregateType, TIME_UNITS } from './consts';
export type InlineRule = {
  id: string;
  subjects: string[] | readonly string[];
} & (
  | {
      fnName: 'evaluateHighTransactionTypePercentage';
      options: Omit<HighTransactionTypePercentage, 'projectId'>;
    }
  | {
      fnName: 'evaluateTransactionsAgainstDynamicRules';
      options: Omit<TransactionsAgainstDynamicRulesType, 'projectId'>;
    }
  | {
      fnName: 'evaluateCustomersTransactionType';
      options: Omit<TCustomersTransactionTypeOptions, 'projectId'>;
    }
  | {
      fnName: 'evaluateTransactionLimitHistoricAverageInbound';
      options: Omit<TransactionLimitHistoricAverageOptions, 'projectId'>;
    }
);

export type TAggregations = keyof typeof AggregateType;

export type TExcludedCounterparty = {
  counterpartyBeneficiaryIds: string[] | readonly string[];
  counterpartyOriginatorIds: string[] | readonly string[];
};

export type TimeUnit = (typeof TIME_UNITS)[keyof typeof TIME_UNITS];

export type TransactionsAgainstDynamicRulesType = {
  projectId: string;
  havingAggregate?: TAggregations;
  amountBetween?: { min: number; max: number };
  timeAmount?: number;
  transactionType?: TransactionRecordType[] | readonly TransactionRecordType[];
  timeUnit?: TimeUnit;
  direction?: TransactionDirection;
  excludedCounterparty?: TExcludedCounterparty;
  paymentMethods?: PaymentMethod[] | readonly PaymentMethod[];
  excludePaymentMethods?: boolean;
  days?: number;
  amountThreshold?: number;
  groupBy?: string[] | readonly string[];
};

export type HighTransactionTypePercentage = {
  projectId: string;
  transactionType: TransactionRecordType;
  subjectColumn: 'counterpartyOriginatorId' | 'counterpartyBeneficiaryId';
  minimumCount: number;
  minimumPercentage: number;
  timeAmount: number;
  timeUnit: TimeUnit;
};

export type TCustomersTransactionTypeOptions = {
  projectId: string;
  transactionType?: TransactionRecordType[] | readonly TransactionRecordType[];
  threshold?: number;
  paymentMethods?: PaymentMethod[] | readonly PaymentMethod[];
  timeAmount?: number;
  timeUnit?: TimeUnit;
  isPerBrand?: boolean;
  havingAggregate?: TAggregations;
};

export type TransactionLimitHistoricAverageOptions = {
  projectId: string;
  transactionDirection: TransactionDirection;
  paymentMethod: {
    value: PaymentMethod;
    operator: '=' | '!=';
  };
  minimumCount: number;
  minimumTransactionAmount: number;
  transactionFactor: number;
};
