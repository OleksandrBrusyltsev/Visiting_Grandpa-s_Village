import BookingComponent from "@/components/BookingComponent/BookingComponent";
import Houses from "@/components/Houses/Houses";

type Props = {}

export default function page({}: Props) {
  return (
    <>
      <div 
      className="container"
        style={{
          marginTop: '40px',
        }}
      > Breadcrumbs ...</div>
      <div
      className="container"

        style={{
          marginTop: '16px',
        }}
      >Arrow back</div>
      <Houses >
        <BookingComponent />
      </Houses>
    </>
  )
}