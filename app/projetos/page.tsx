"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Heart, HandHeart, BookOpen, Landmark, School, Baby } from "lucide-react";

// Dados de exemplo para projetos
const projetos = [
  {
    id: 1,
    titulo: "Projeto Cesta do Amor",
    categoria: "Ação Social",
    descricao: "Distribuição de cestas básicas para famílias em situação de vulnerabilidade social.",
    imagem: "https://scontent.fbsb3-1.fna.fbcdn.net/v/t39.30808-6/239903715_4490221671085675_5182379027230754384_n.png?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=S80fPHNXNdkQ7kNvgHL0T8a&_nc_oc=Adhzky_Pp8dVg3nQ0CMubOOfxJEMnI3e2rpPGbnTxVxa1HJnlEl6vH38Qw_P1lWQ40I&_nc_zt=23&_nc_ht=scontent.fbsb3-1.fna&_nc_gid=A2lm1R_BZQFTP3mlwyfhH6e&oh=00_AYA_lGWUCXT_0jlKVophE_0Mdctyr2k_uFp89n5r8hF0Hg&oe=67C635C6",
    meta: 1000,
    arrecadado: 0,
    voluntarios: 3,
    dataInicio: "2025-01-15",
    status: "Em andamento",
    icon: <HandHeart className="h-6 w-6" />,
    detalhes: {
      objetivo: "Fornecer alimentos para 100 famílias em situação de vulnerabilidade social por mês.",
      impacto: "Mais de 40 pessoas beneficiadas mensalmente com cestas básicas e itens de higiene.",
      comoParticipar: "Você pode contribuir doando alimentos não perecíveis, produtos de higiene ou fazendo uma doação financeira.",
      proximos: [
        { data: "25/06/2025", evento: "Arrecadação de cestas básicas" },
      ]
    }
  },
  {
    id: 2,
    titulo: "Escola Bíblica de Férias",
    categoria: "EBD",
    descricao: "Programa especial para crianças durante as férias escolares com atividades lúdicas e ensino bíblico.",
    imagem: "https://scontent.fbsb3-1.fna.fbcdn.net/v/t39.30808-6/239903715_4490221671085675_5182379027230754384_n.png?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=S80fPHNXNdkQ7kNvgHL0T8a&_nc_oc=Adhzky_Pp8dVg3nQ0CMubOOfxJEMnI3e2rpPGbnTxVxa1HJnlEl6vH38Qw_P1lWQ40I&_nc_zt=23&_nc_ht=scontent.fbsb3-1.fna&_nc_gid=A2lm1R_BZQFTP3mlwyfhH6e&oh=00_AYA_lGWUCXT_0jlKVophE_0Mdctyr2k_uFp89n5r8hF0Hg&oe=67C635C6",
    meta: 5000,
    arrecadado: 3800,
    voluntarios: 15,
    dataInicio: "2025-07-10",
    status: "Em planejamento",
    icon: <Baby className="h-6 w-6" />,
    detalhes: {
      objetivo: "Proporcionar um ambiente divertido e educativo para 50 crianças durante as férias escolares, ensinando valores cristãos através de atividades lúdicas.",
      impacto: "Alcançar crianças da igreja e comunidade e proporcionar uma experiência transformadora através de brincadeiras, histórias bíblicas e atividades educativas.",
      comoParticipar: "Precisamos de voluntários para atuar como monitores, professores, equipe de recreação, lanche e apoio. Também aceitamos doações de materiais escolares e lanches.",
      proximos: [
        { data: "15/06/2025", evento: "Reunião de planejamento" },
        { data: "01/07/2025", evento: "Treinamento de voluntários" },
        { data: "10/07/2025", evento: "Início da EBF" }
      ]
    }
  },
  {
    id: 3,
    titulo: "Projeto Musical",
    categoria: "Educação",
    descricao: "Aulas de música e preparatório para serem incentivo a musicalização.",
    imagem: "https://scontent.fbsb3-1.fna.fbcdn.net/v/t39.30808-6/239903715_4490221671085675_5182379027230754384_n.png?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=S80fPHNXNdkQ7kNvgHL0T8a&_nc_oc=Adhzky_Pp8dVg3nQ0CMubOOfxJEMnI3e2rpPGbnTxVxa1HJnlEl6vH38Qw_P1lWQ40I&_nc_zt=23&_nc_ht=scontent.fbsb3-1.fna&_nc_gid=A2lm1R_BZQFTP3mlwyfhH6e&oh=00_AYA_lGWUCXT_0jlKVophE_0Mdctyr2k_uFp89n5r8hF0Hg&oe=67C635C6",
    meta: 2000,
    arrecadado: 0,
    voluntarios: 2,
    dataInicio: "2025-02-05",
    status: "Em andamento",
    icon: <School className="h-6 w-6" />,
    detalhes: {
      objetivo: "Oferecer suporte educacional para 30 alunos de musicalização, ajudando-os a melhorar seu desempenho com instrumentos pessoais.",
      impacto: "Igreja com mais qualificação músical.",
      comoParticipar: "Precisamos de professores voluntários nas áreas de canto e instrumental. Também aceitamos doações de equipamentos.",
      proximos: [
        { data: "Toda quarta", evento: "Aula de Música (20h às 21h)" }
      ]
    }
  },
  {
    id: 4,
    titulo: "Cruzada Evangelística",
    categoria: "Evangelismo",
    descricao: "Ações evangelísticas na cidade Sobradinho II.",
    imagem: "https://scontent.fbsb3-1.fna.fbcdn.net/v/t39.30808-6/239903715_4490221671085675_5182379027230754384_n.png?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=S80fPHNXNdkQ7kNvgHL0T8a&_nc_oc=Adhzky_Pp8dVg3nQ0CMubOOfxJEMnI3e2rpPGbnTxVxa1HJnlEl6vH38Qw_P1lWQ40I&_nc_zt=23&_nc_ht=scontent.fbsb3-1.fna&_nc_gid=A2lm1R_BZQFTP3mlwyfhH6e&oh=00_AYA_lGWUCXT_0jlKVophE_0Mdctyr2k_uFp89n5r8hF0Hg&oe=67C635C6",
    meta: 6000,
    arrecadado: 0,
    voluntarios: 30,
    dataInicio: "2025-02-10",
    status: "Em andamento",
    icon: <Heart className="h-6 w-6" />,
    detalhes: {
      objetivo: "Levar a mensagem do evangelho para a cidade, alcançando pessoas que não frequentam igrejas.",
      impacto: "Centenas de pessoas alcançadas com a mensagem de esperança e amor de Cristo.",
      comoParticipar: "Você pode participar sendo um membro da igreja das equipes de evangelismo, distribuição de planfetos.",
      proximos: [
        { data: "2025-07-01", evento: "Cruzada Evangelística" }
      ]
    }
  },
  {
    id: 5,
    titulo: "Construção do Templo",
    categoria: "Infraestrutura",
    descricao: "Projeto para finalização da construção da igreja para maior capacidade e melhores instalações.",
    imagem: "https://scontent.fbsb3-1.fna.fbcdn.net/v/t39.30808-6/239903715_4490221671085675_5182379027230754384_n.png?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=S80fPHNXNdkQ7kNvgHL0T8a&_nc_oc=Adhzky_Pp8dVg3nQ0CMubOOfxJEMnI3e2rpPGbnTxVxa1HJnlEl6vH38Qw_P1lWQ40I&_nc_zt=23&_nc_ht=scontent.fbsb3-1.fna&_nc_gid=A2lm1R_BZQFTP3mlwyfhH6e&oh=00_AYA_lGWUCXT_0jlKVophE_0Mdctyr2k_uFp89n5r8hF0Hg&oe=67C635C6",
    meta: 5000,
    arrecadado: 0,
    voluntarios: 0,
    dataInicio: "2024-10-01",
    status: "Em andamento",
    icon: <Landmark className="h-6 w-6" />,
    detalhes: {
      objetivo: "Finalizar o templo com capacidade para 400 pessoas, incluindo salas para escola bíblica, berçário, estacionamento e áreas de convivência.",
      impacto: "Proporcionar um espaço adequado para o crescimento da igreja e melhor atendimento aos membros e visitantes.",
      comoParticipar: "Você pode contribuir financeiramente com o projeto através de ofertas específicas para a construção. Empresários podem ajudar com doações de materiais ou serviços.",
      proximos: [
        { data: "Em andamento", evento: "Fase de acabamento de estrutura" },
      ]
    }
  },
  {
    id: 6,
    titulo: "Projeto Família",
    categoria: "Família",
    descricao: "Aconselhamento e suporte para casais e famílias em crise.",
    imagem: "https://scontent.fbsb3-1.fna.fbcdn.net/v/t39.30808-6/239903715_4490221671085675_5182379027230754384_n.png?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=S80fPHNXNdkQ7kNvgHL0T8a&_nc_oc=Adhzky_Pp8dVg3nQ0CMubOOfxJEMnI3e2rpPGbnTxVxa1HJnlEl6vH38Qw_P1lWQ40I&_nc_zt=23&_nc_ht=scontent.fbsb3-1.fna&_nc_gid=A2lm1R_BZQFTP3mlwyfhH6e&oh=00_AYA_lGWUCXT_0jlKVophE_0Mdctyr2k_uFp89n5r8hF0Hg&oe=67C635C6",
    meta: 2000,
    arrecadado: 2800,
    voluntarios: 8,
    dataInicio: "2025-04-20",
    status: "Em andamento",
    icon: <Users className="h-6 w-6" />,
    detalhes: {
      objetivo: "Oferecer suporte emocional, espiritual e prático para famílias em crise, promovendo a restauração de relacionamentos.",
      impacto: "Dezenas de casais e famílias recebendo aconselhamento e apoio para superar crises e fortalecer seus relacionamentos.",
      comoParticipar: "Precisamos de voluntários com formação em psicologia. Também aceitamos doações para custear materiais e eventos.",
      proximos: [
        { data: "Toda terça", evento: "Aconselhamento para casais (mediante agendamento)" },
        { data: "Último sábado do mês", evento: "Encontro de Casais" },
        { data: "15/07/2025", evento: "Workshop: Educação de Filhos" }
      ]
    }
  }
];

// Categorias de projetos
const categorias = [
  { id: "todos", nome: "Todos" },
  { id: "Ação Social", nome: "Ação Social" },
  { id: "EBD", nome: "EBD" },
  { id: "Educação", nome: "Educação" },
  { id: "Evangelismo", nome: "Evangelismo" },
  { id: "Infraestrutura", nome: "Infraestrutura" },
  { id: "Família", nome: "Família" }
];

export default function ProjetosPage() {
  const [selectedCategoria, setSelectedCategoria] = useState("todos");
  const [selectedProjeto, setSelectedProjeto] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filtrar projetos por categoria
  const filteredProjetos = selectedCategoria === "todos"
    ? projetos
    : projetos.filter(projeto => projeto.categoria === selectedCategoria);

  const handleProjetoSelect = (projeto: any) => {
    setSelectedProjeto(projeto);
    setIsDialogOpen(true);
  };

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Nossos Projetos</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Conheça as iniciativas da igreja ADEV 11 e descubra como você pode participar e contribuir
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <Tabs defaultValue="todos" value={selectedCategoria} onValueChange={setSelectedCategoria}>
          <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full md:w-auto">
            {categorias.map((categoria) => (
              <TabsTrigger key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjetos.map((projeto) => (
          <Card key={projeto.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-48 w-full">
              <Image
                src={projeto.imagem}
                alt={projeto.titulo}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-white text-primary hover:bg-white/90">
                  {projeto.categoria}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  {projeto.icon}
                </div>
                <CardTitle>{projeto.titulo}</CardTitle>
              </div>
              <CardDescription>{projeto.descricao}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Meta: R$ {projeto.meta.toLocaleString('pt-BR')}</span>
                  <span className="font-medium">{Math.round((projeto.arrecadado / projeto.meta) * 100)}%</span>
                </div>
                <Progress value={(projeto.arrecadado / projeto.meta) * 100} className="h-2" />
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Início: {new Date(projeto.dataInicio).toLocaleDateString('pt-BR')}</span>
                </div>
                {projeto.voluntarios > 0 && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{projeto.voluntarios} voluntários</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className={
                    projeto.status === "Em andamento" ? "text-green-500 border-green-200" :
                    projeto.status === "Em planejamento" ? "text-blue-500 border-blue-200" :
                    projeto.status === "Concluído" ? "text-gray-500 border-gray-200" : ""
                  }>
                    {projeto.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleProjetoSelect(projeto)}
              >
                Saiba Mais
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredProjetos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum projeto encontrado nesta categoria.</p>
        </div>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedProjeto && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {selectedProjeto.icon}
                  </div>
                  <DialogTitle>{selectedProjeto.titulo}</DialogTitle>
                </div>
                <DialogDescription>
                  {selectedProjeto.descricao}
                </DialogDescription>
              </DialogHeader>
              
              <div className="relative h-60 w-full my-4 rounded-md overflow-hidden">
                <Image
                  src={selectedProjeto.imagem}
                  alt={selectedProjeto.titulo}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-semibold">Objetivo</h4>
                  <p className="text-sm text-muted-foreground">{selectedProjeto.detalhes.objetivo}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Impacto</h4>
                  <p className="text-sm text-muted-foreground">{selectedProjeto.detalhes.impacto}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Como Participar</h4>
                  <p className="text-sm text-muted-foreground">{selectedProjeto.detalhes.comoParticipar}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Próximos Eventos</h4>
                  <ul className="space-y-2">
                    {selectedProjeto.detalhes.proximos.map((evento: any, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <span className="font-medium">{evento.data}</span>
                          <p className="text-muted-foreground">{evento.evento}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Progresso da Arrecadação</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Arrecadado: R$ {selectedProjeto.arrecadado.toLocaleString('pt-BR')}</span>
                      <span>Meta: R$ {selectedProjeto.meta.toLocaleString('pt-BR')}</span>
                    </div>
                    <Progress value={(selectedProjeto.arrecadado / selectedProjeto.meta) * 100} className="h-2" />
                    <p className="text-right text-sm font-medium">
                      {Math.round((selectedProjeto.arrecadado / selectedProjeto.meta) * 100)}% concluído
                    </p>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Fechar</Button>
                <Button>Quero Contribuir</Button>
                {selectedProjeto.voluntarios > 0 && (
                  <Button variant="secondary">Ser Voluntário</Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <section className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Como Contribuir</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Existem diversas formas de apoiar os projetos da igreja ADEV 11
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <HandHeart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Doações Financeiras</CardTitle>
              <CardDescription>
                Contribua financeiramente para os projetos da igreja
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Suas doações são fundamentais para mantermos nossos projetos sociais e evangelísticos. Você pode contribuir através de PIX, transferência bancária ou presencialmente.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">PIX:</span>
                  <span>00.000.000/0001-00 (CNPJ)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Banco:</span>
                  <span>Banco ADEV - Ag. 0001 - CC 12345-6</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Fazer uma Doação</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Voluntariado</CardTitle>
              <CardDescription>
                Doe seu tempo e talentos para nossos projetos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Temos diversas oportunidades para voluntários em diferentes áreas. Você pode ajudar de acordo com sua disponibilidade e habilidades.
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Mile</li>
                <li>• Portaria</li>
                <li>• Evangelismo</li>
                <li>• Multímidia</li>
                <li>• Intercessão</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Seja Voluntário</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Doações de Itens</CardTitle>
              <CardDescription>
                Contribua com alimentos, roupas e outros itens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Aceitamos doações de diversos itens que são distribuídos para pessoas necessitadas ou utilizados em nossos projetos sociais.
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Alimentos não perecíveis</li>
                <li>• Roupas e calçados em bom estado</li>
                <li>• Material escolar</li>
                <li>• Produtos de higiene pessoal</li>
                <li>• Móveis e eletrodomésticos</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Saiba Mais</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Faça Parte Desta Missão</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          Juntos podemos fazer a diferença na vida de muitas pessoas. Cada contribuição, por menor que seja, é importante para continuarmos nosso trabalho.
        </p>
        <Button size="lg" className="text-base">
          Entre em Contato
        </Button>
      </section>
    </div>
  );
}