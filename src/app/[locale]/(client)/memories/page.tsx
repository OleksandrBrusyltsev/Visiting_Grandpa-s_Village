import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import Memories from "@/components/Memories/Memories"

type Props = {}

export default function page({}: Props) {

  return (
    <div className="container">
      <Memories />
    </div>
  )
}