import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Heart, Lightbulb, DollarSign, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            alt="Igreja ADEV 11"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Igreja ADEV 11</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Transformando vidas através da palavra de Deus
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base">
              <Link href="/agenda">Nossa Agenda</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base bg-transparent text-white border-white hover:bg-white/10">
              <Link href="/voluntariado">Seja Voluntário</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Próximos Eventos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Confira nossa programação e participe dos nossos cultos e atividades
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Culto da Ensino",
                date: "Terça, 20:00",
                description: "Um momento especial para buscarmos a Deus em nosso culto de celebração."
              },{
                title: "Culto da Libertação",
                date: "Quinta, 20:00",
                description: "Um momento especial para buscarmos a Deus em nosso culto de celebração."
              },
              {
                title: "Escola Bíblica Dominical",
                date: "Domingo, 09:00",
                description: "Venha celebrar e adorar a Deus conosco em nosso culto dominical."
              },
              {
                title: "Culto da Família",
                date: "Quarta, 18:00",
                description: "Um momento especial para buscarmos a Deus em nosso culto de celebração."
              },
              {
                title: "Oração",
                date: "Terça e Quinta, 06:00",
                description: "Um momento especial para buscarmos a Deus."
              },
              {
                title: "Encontro de Departamentos",
                date: "Sexta, 20:00",
                description: "Um momento especial para coomunhão."
              }
            ].map((event, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {event.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/agenda">Ver Agenda Completa</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Nossos Ministérios */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Departamentos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conheça as áreas de atuação da nossa igreja
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Mile Music",
                description: "Adoração e louvor através da música."
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Departamento Infantil Kemuel",
                description: "Ensinando as crianças no caminho do Senhor."
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Departamento de Homens Gileade",
                description: "Comunhão e crescimento para os jovens da igreja."
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Departamento de Jovens Samah",
                description: "Comunhão e crescimento para os jovens da igreja."
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Departamento de Mulheres Silóe",
                description: "Ajudando os necessitados e impactando a comunidade."
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "ECADEV",
                description: "Fortalecendo famílias e relacionamentos."
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Multimídia",
                description: "Adorando atráves das redes sociais."
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Departamento da Terceira Idade",
                description: "Adorando atráves até que Ele venha."
              }
            ].map((ministry, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4">{ministry.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{ministry.title}</h3>
                  <p className="text-muted-foreground">{ministry.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild>
              <Link href="/voluntariado">Seja Voluntário</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Faça Parte da Nossa Igreja</h2>
          <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/90">
            Venha conhecer nossa igreja e fazer parte da família ADEV 11. Estamos de braços abertos para receber você!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/dizimos">Contribua com Dízimos</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}