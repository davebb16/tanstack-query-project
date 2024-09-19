import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-20">
      <h3 className='bg-red-500'>Welcome Home!</h3>
    </div>
  )
}
