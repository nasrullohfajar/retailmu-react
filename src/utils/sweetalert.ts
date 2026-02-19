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
