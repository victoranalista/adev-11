"use client";

import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Music, BookOpen, Users, Video, Headphones, MessageSquare, Briefcase, Globe, HandHeart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Dados de exemplo para ministérios
const ministerios = [
  {
    id: 1,
    nome: "Ministério de Louvor",
    descricao: "Adoração e louvor através da música e artes.",
    icon: <Music className="h-10 w-10 text-primary" />,
    funcoes: [
      "Vocal", "Violão", "Guitarra", "Baixo", "Bateria", "Teclado", "Produção Musical"
    ]
  },
  {
    id: 2,
    nome: "Ministério Infantil Kemuel",
    descricao: "Ensinando as crianças no caminho do Senhor.",
    icon: <Heart className="h-10 w-10 text-primary" />,
    funcoes: [
      "Professor(a)", "Auxiliar", "Contador de Histórias Bíblicas", "Recreação", "Berçário"
    ]
  },
  {
    id: 3,
    nome: "Professor",
    descricao: "Estudos bíblicos e discipulado para crescimento espiritual.",
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    funcoes: [
      "Professor(a) de EBD", "Estudos Bíblicos"
    ]
  },
  {
    id: 5,
    nome: "Multímidia",
    descricao: "Comunicação, transmissão e produção de conteúdo.",
    icon: <Video className="h-10 w-10 text-primary" />,
    funcoes: [
      "Operador de Som", "Operador de Projeção", "Fotografia", "Filmagem", "Edição de Vídeo", "Transmissão Online", "Design Gráfico", "Redes Sociais"
    ]
  },
  {
    id: 6,
    nome: "Ministério de Intercessão",
    descricao: "Dedicado à oração e intercessão pela igreja e comunidade.",
    icon: <Headphones className="h-10 w-10 text-primary" />,
    funcoes: [
      "Intercessor", "Líder de Grupo de Oração", "Vigília"
    ]
  },
  {
    id: 7,
    nome: "Portaria",
    descricao: "Acolhimento e hospitalidade para membros e visitantes.",
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    funcoes: [
      "Recepcionista", "Acolhimento", "Informações", "Organização"
    ]
  },
  {
    id: 8,
    nome: "Ministério de Casais",
    descricao: "Fortalecendo famílias e relacionamentos.",
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    funcoes: [
      "Conselheiro", "Organização de Eventos", "Facilitador de Grupos"
    ]
  },
  {
    id: 9,
    nome: "Ministério de Missões",
    descricao: "Apoio e participação em trabalhos missionários.",
    icon: <Globe className="h-10 w-10 text-primary" />,
    funcoes: [
      "Missionário", "Apoio Logístico", "Arrecadação", "Comunicação"
    ]
  },
  {
    id: 10,
    nome: "Cesta do Amor",
    descricao: "Ajudando os necessitados e impactando a comunidade.",
    icon: <HandHeart className="h-10 w-10 text-primary" />,
    funcoes: [
      "Assistência Social", "Distribuição de Alimentos", "Visitas", "Organização de Campanhas", "Arrecadação"
    ]
  }
];

export default function VoluntariadoPage() {
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMinisterio, setSelectedMinisterio] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    ministerios: [] as number[],
    funcoes: [] as string[],
    experiencia: "",
    disponibilidade: "",
    motivacao: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleMinisterioSelect = (ministerioId: number) => {
    setSelectedMinisterio(ministerioId);
    setOpenDialog(true);
  };

  const handleMinisterioChange = (ministerioId: number, checked: boolean) => {
    setFormData(prev => {
      if (checked) {
        return { ...prev, ministerios: [...prev.ministerios, ministerioId] };
      } else {
        return { ...prev, ministerios: prev.ministerios.filter(id => id !== ministerioId) };
      }
    });
  };

  const handleFuncaoChange = (funcao: string, checked: boolean) => {
    setFormData(prev => {
      if (checked) {
        return { ...prev, funcoes: [...prev.funcoes, funcao] };
      } else {
        return { ...prev, funcoes: prev.funcoes.filter(f => f !== funcao) };
      }
    });
  };

  const handleSubmit = () => {
    // Aqui seria implementada a lógica para salvar a inscrição
    console.log("Inscrição:", formData);
    toast({
      title: "Inscrição enviada com sucesso!",
      description: "Entraremos em contato em breve.",
    });
    // Resetar o formulário
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      ministerios: [],
      funcoes: [],
      experiencia: "",
      disponibilidade: "",
      motivacao: ""
    });
  };

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Seja um Voluntário</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Descubra como você pode servir na igreja ADEV 11 e fazer parte da nossa missão de transformar vidas
        </p>
      </div>
      
      <Tabs defaultValue="ministerios" className="mb-12">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="ministerios">Nossos Ministérios</TabsTrigger>
          <TabsTrigger value="inscricao">Formulário de Inscrição</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ministerios">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministerios.map((ministerio) => (
              <Card key={ministerio.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="mb-4">{ministerio.icon}</div>
                  <CardTitle>{ministerio.nome}</CardTitle>
                  <CardDescription>{ministerio.descricao}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <h4 className="font-medium mb-2">Funções:</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {ministerio.funcoes.slice(0, 4).map((funcao, index) => (
                      <li key={index}>{funcao}</li>
                    ))}
                    {ministerio.funcoes.length > 4 && (
                      <li>E mais {ministerio.funcoes.length - 4} funções...</li>
                    )}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => handleMinisterioSelect(ministerio.id)}
                  >
                    Quero Participar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="inscricao">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Formulário de Inscrição para Voluntários</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo para se inscrever como voluntário em um ou mais ministérios da igreja.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input 
                    id="nome" 
                    placeholder="Seu nome completo" 
                    value={formData.nome}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu.email@exemplo.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Ministérios de Interesse</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {ministerios.map((ministerio: { id: Key | null | undefined; nome: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => (
                    <div key={ministerio.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`ministerio-${ministerio.id}`} 
                        checked={ministerio.id !== undefined && formData.ministerios.includes(ministerio.id as number)}
                        onCheckedChange={(checked) => handleMinisterioChange(ministerio.id as number, checked === true)}
                      />
                      <label
                        htmlFor={`ministerio-${ministerio.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {ministerio.nome}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {formData.ministerios.length > 0 && (
                <div className="space-y-2">
                  <Label>Funções de Interesse</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {ministerios
                      .filter(m => formData.ministerios.includes(m.id))
                      .flatMap(m => m.funcoes)
                      .filter((funcao, index, self) => self.indexOf(funcao) === index) // Remove duplicados
                      .map((funcao, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`funcao-${index}`} 
                            checked={formData.funcoes.includes(funcao)}
                            onCheckedChange={(checked) => handleFuncaoChange(funcao, checked === true)}
                          />
                          <label
                            htmlFor={`funcao-${index}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {funcao}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="experiencia">Experiência Prévia</Label>
                <Textarea 
                  id="experiencia" 
                  placeholder="Descreva sua experiência prévia, se houver, relacionada ao(s) ministério(s) escolhido(s)." 
                  value={formData.experiencia}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="disponibilidade">Disponibilidade</Label>
                <Textarea 
                  id="disponibilidade" 
                  placeholder="Informe sua disponibilidade de dias e horários para servir." 
                  value={formData.disponibilidade}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="motivacao">Motivação</Label>
                <Textarea 
                  id="motivacao" 
                  placeholder="Por que você deseja servir neste(s) ministério(s)?" 
                  value={formData.motivacao}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSubmit}>Enviar Inscrição</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedMinisterio && (
            <>
              <DialogHeader>
                <DialogTitle>{ministerios.find(m => m.id === selectedMinisterio)?.nome}</DialogTitle>
                <DialogDescription>
                  {ministerios.find(m => m.id === selectedMinisterio)?.descricao}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <h4 className="font-medium mb-2">Funções disponíveis:</h4>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {ministerios.find(m => m.id === selectedMinisterio)?.funcoes.map((funcao, index) => (
                    <li key={index}>{funcao}</li>
                  ))}
                </ul>
                
                <div className="mt-6 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Ao clicar em "Quero Participar", você será direcionado para o formulário de inscrição onde poderá selecionar este ministério e as funções de seu interesse.
                  </p>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancelar</Button>
                <Button onClick={() => {
                  setOpenDialog(false);
                  handleMinisterioChange(selectedMinisterio, true);
                  document.querySelector('[data-value="inscricao"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}>
                  Quero Participar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Por que ser voluntário?</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          Servir na igreja é uma oportunidade de usar seus dons e talentos para abençoar outras pessoas e crescer espiritualmente.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Desenvolva seus dons</h3>
            <p className="text-muted-foreground">
              Descubra e desenvolva seus talentos e habilidades servindo no Reino de Deus.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Faça parte da comunidade</h3>
            <p className="text-muted-foreground">
              Conecte-se com outras pessoas e construa relacionamentos significativos.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <HandHeart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Impacte vidas</h3>
            <p className="text-muted-foreground">
              Faça a diferença na vida das pessoas e contribua para a missão da igreja.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}