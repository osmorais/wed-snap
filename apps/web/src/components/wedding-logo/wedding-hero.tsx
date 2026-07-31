// Versão grande e centralizada da marca — usada na landing e na tela de
// login, os dois pontos de entrada do app. Nesses dois lugares o cabeçalho
// pequeno e fixo (WeddingLogo) fica escondido pra não duplicar a marca.
export function WeddingHero() {
  return (
    <div className="space-y-2 text-center">
      <p className="font-heading text-5xl leading-tight italic sm:text-6xl">
        Larissa <span className="text-primary not-italic">&amp;</span> Osmar
      </p>
      <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase">15.08.26</p>
    </div>
  );
}
