export default function AdminLoading() {
  return (
    <div className="min-h-[100dvh] bg-slate-950 flex flex-col items-center justify-center p-6">
      {/* Spinner elegante azul */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      
      {/* Texto pulsando com o seu estilo de fonte */}
      <p className="mt-6 text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
        Atualizando Dashboard...
      </p>
    </div>
  )
}