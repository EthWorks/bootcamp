import { BigNumber } from '@ethersproject/bignumber'

export interface ChainState {
  user?: UserState
  shared: SharedState
}

export interface UserState {
  ethBalance: BigNumber
  januszBalance: BigNumber
  grazynaBalance: BigNumber
  januszApproval: BigNumber
  grazynaApproval: BigNumber
}

export interface SharedState {}
