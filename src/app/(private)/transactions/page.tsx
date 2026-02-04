import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

function TransactionsPage() {
  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h1 className='text-xl font-bold'>
                Transactions
            </h1>
            <Button type="primary">
                <Link href="/transactions/new" className='no-underline'>
                New Transaction
                </Link>
                </Button>
        </div>
    </div>
  )
}

export default TransactionsPage