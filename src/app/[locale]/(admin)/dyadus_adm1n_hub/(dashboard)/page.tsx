import React from 'react'

type Props = {children: React.ReactNode}

export default async function page({ children }: Props) {

  return (
    <div>
      <aside>
        <nav>
          <ul>
            
          </ul>
        </nav>
      </aside>
      <div className="children_wrapper">
        { children}
      </div>
    </div>
  )
}