import NavBar from "@/components/navBar";

export default function EditLot() {
    // if (localStorage.getItem('accessToken') === null ) {
    //     alert("Please login first");
    //     window.location.href = "/login";
    //     return
    // }
    return (
        <>
            <NavBar/>
        <div>
            <h1 className=" flex fixed inset-0 h-3/5 my-auto items-center text-white text-3xl justify-center">Edit Lot coming soon ...</h1>
        </div>
        </>
    )
}