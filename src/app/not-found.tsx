"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#D3DBE7] flex items-center justify-center p-[16px]">
      <div className="bg-white border border-[#C3D1E0] rounded-[5px] max-w-[400px] w-full text-center overflow-hidden">
        <div className="bg-[#6D84B4] px-[12px] py-[6px]">
          <h1 className="text-white text-[14px] font-bold">erro 404</h1>
        </div>
        <div className="p-[16px] space-y-[12px]">
          <img
            src="/images/gifs/cachorro.gif"
            alt="cachorro perdido"
            className="mx-auto h-[120px]"
          />
          <p className="text-[12px] text-[#333]">
            opa, essa pagina nao existe!
          </p>
          <p className="text-[10px] text-[#999]">
            parece que voce se perdeu no orkut...
          </p>
          <Link
            href="/perfil"
            className="inline-block bg-[#6D84B4] hover:bg-[#5A7199] text-white text-[11px] font-bold rounded-[3px] py-[6px] px-[16px] no-underline"
          >
            voltar pro perfil
          </Link>
        </div>
      </div>
    </div>
  );
}
