export default function AdminLoading() {
  return (
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col items-center justify-center p-6 select-none">
      {/* Spinner elegante azul no fundo claro */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      
      {/* Texto Kairós pulsando sutil */}
      <p className="mt-5 text-slate-800 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
        Kairós
      </p>
    </div>
  )
}