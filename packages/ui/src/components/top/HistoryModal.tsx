import React, { useMemo } from 'react'
import styled from 'styled-components'
import { ChainId, Colors } from '../../constants'
import { useEthers, useTransactions } from '../../hooks'
import { StoredTransaction } from '../../providers'
import { Modal } from '../Modal'
import { Title } from '../page'
import { Spinner } from './Spinner'

interface Props {
  onClose: () => void
}

export function HistoryModal({ onClose }: Props) {
  const { transactions } = useTransactions()
  const reversed = useMemo(() => [...transactions].reverse(), [transactions])

  return (
    <Modal onClose={onClose}>
      <Title>Transactions</Title>
      {reversed.length === 0 && <p>The list of your transactions will appear here</p>}
      <List>
        {reversed.map((tx) => (
          <TransactionItem key={tx.hash} tx={tx} />
        ))}
      </List>
    </Modal>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getEtherscanLink(transaction: StoredTransaction, chainId: ChainId) {
  return ''
}

function TransactionItem({ tx }: { tx: StoredTransaction }) {
  const { chainId = ChainId.Ganache } = useEthers()
  return (
    <ListItem>
      {!tx.receipt && <Spinner />}{' '}
      <a href={getEtherscanLink(tx, chainId)} target="_blank">
        {tx.description}
      </a>
    </ListItem>
  )
}

const List = styled.ol`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const ListItem = styled.li`
  margin-bottom: 12px;

  a {
    color: ${Colors.Black};
  }
`
