import Link from "next/link";
import { Church, Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Church className="h-6 w-6" />
              <span>ADEV 11</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Transformando vidas através da palavra de Deus.
            </p>
            <div className="flex gap-4">
              <Link href="instagram.com/adev.11" target="_blank" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://www.facebook.com/adev11/" target="_blank" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://www.youtube.com/@Adev11/featured" target="_blank" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/agenda" className="text-muted-foreground hover:text-primary">
                  Agenda
                </Link>
              </li>
              <li>
                <Link href="/voluntariado" className="text-muted-foreground hover:text-primary">
                  Seja Voluntário
                </Link>
              </li>
              <li>
                <Link href="/projetos" className="text-muted-foreground hover:text-primary">
                  Nossos Projetos
                </Link>
              </li>
              <li>
                <Link href="/dizimos" className="text-muted-foreground hover:text-primary">
                  Dízimos e Ofertas
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                Ar 11 Conj. 03 Área Especial 2, Sobradinho II - DF</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">(00) 00000-0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">contato@adev11.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ADEV 11. Site criado por André Victor.</p>
        </div>
      </div>
    </footer>
  );
}