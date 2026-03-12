import Swal from "sweetalert2";

export const confirmDeleteAlert = (title: string, onConfirm: () => void) => {
  Swal.fire({
    title: `Hapus ${title}?`,
    text: "Data yang dihapus tidak bisa dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#60A5FA",
    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};

export const successAlert = (text: string) => {
  Swal.fire({
    icon: "success",
    text: text,
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: "top-right",
    width: "auto",
    customClass: {
      htmlContainer: "text-xs lg:text-sm whitespace-nowrap px-4",
      popup: "flex items-center",
    },
  });
};
