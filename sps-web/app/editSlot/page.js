import NavBar from "@/components/navBar";

export default function EditSlot() {
    // if (localStorage.getItem('accessToken') === null ) {
    //     alert("Please login first");
    //     window.location.href = "/login";
    //     return
    // }
    return (
        <div>
            <NavBar />
            <h1 className=" flex fixed inset-0 h-3/5 my-auto text-white text-3xl items-center justify-center">Edit Slot coming soon ...</h1>
        </div>
    )
}