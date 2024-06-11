import BookingComponent from "@/components/BookingComponent/BookingComponent";
import Houses from "@/components/Houses/Houses";

export default function page() {
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