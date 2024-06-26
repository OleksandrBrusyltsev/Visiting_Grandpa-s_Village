import { getData } from "@/actions/getData";
import BookingComponent from "@/components/BookingComponent/BookingComponent";
import Houses from "@/components/Houses/Houses";

export default async function Page() {
  const items = await getData<HouseItem[]>('houses');

  return (
    <>
      <Houses items={items}>
        <BookingComponent />
      </Houses>
    </>
  )
}