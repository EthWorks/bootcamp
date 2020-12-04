import { BigNumber } from '@ethersproject/bignumber'

export interface ChainState {
  user?: UserState
  shared: SharedState
}

export interface UserState {
  ethBalance: BigNumber
  balances: {
    [token: string]: BigNumber | undefined
  }
  approvals: {
    [token: string]: BigNumber | undefined
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SharedState {}
