import React from 'react'
import styled from 'styled-components'
import { Page, PageContent, Title } from '../components'
import { Form } from '../learning/Form'
import { Colors } from '../constants'

export function Home() {
  return (
    <Page>
      <PageContent>
        <Title>Welcome to Ethworks DApp</Title>
        <p>Use the form below to send DAI</p>
        <Separator />
        <Form />
      </PageContent>
    </Page>
  )
}

const Separator = styled.hr`
  border: none;
  border-bottom: 1px solid ${Colors.LightGray};
  margin: 24px -24px;
`
