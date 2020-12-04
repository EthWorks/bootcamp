import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100%;
`

const InputsArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`

const TokenInputGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;
`

const InputLabel = styled.label``

const TokenBalance = styled.div`
  justify-self: end;
`

const Input = styled.input`
  grid-column: span 2;
  width: 100%;
  height: 30px;
`

const ButtonsArea = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-rows: 50px 50px;
  grid-template-columns: 1fr 1fr;
`

const ApproveButton = styled.button``

const AddLiquidityButton = styled.button`
  grid-column: span 2;
`

export function Form() {
  return (
    <Wrapper>
      <InputsArea>
        <TokenInputGroup>
          <InputLabel htmlFor="token-1">token 1</InputLabel>
          <TokenBalance>token 1 balance</TokenBalance>
          <Input id="token-1" type="text" />
        </TokenInputGroup>
        <TokenInputGroup>
          <InputLabel htmlFor="token-2">token 2</InputLabel>
          <TokenBalance>token 2 balance</TokenBalance>
          <Input id="token-2" type="text" />
        </TokenInputGroup>
      </InputsArea>
      <ButtonsArea>
        <ApproveButton>approve token 1</ApproveButton>
        <ApproveButton>approve token 2</ApproveButton>
        <AddLiquidityButton>add liquidity</AddLiquidityButton>
      </ButtonsArea>
    </Wrapper>
  )
}
