import Memories from "@/components/Memories/Memories"

type Props = {}

export default function page({}: Props) {
  return (
    <div className="container">
      <div
        style={{
          marginTop: '40px',
        }}
      > Breadcrumbs ...</div>
      <div
        style={{
          marginTop: '16px',
        }}
      >Arrow back</div>
      <Memories />
    </div>
  )
}