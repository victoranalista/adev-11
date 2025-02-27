"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DollarSign, CreditCard, Landmark, QrCode, Copy, Check, Download, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DizimosPage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [comprovante, setComprovante] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    valor: "",
    tipo: "dízimo",
    metodo: "",
    observacoes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setComprovante(e.target.files[0]);
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00000000000");
    setCopied(true);
    toast({
      title: "Chave PIX copiada!",
      description: "A chave PIX foi copiada para a área de transferência.",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = () => {
    // Aqui seria implementada a lógica para enviar o comprovante
    console.log("Dados do formulário:", formData);
    console.log("Comprovante:", comprovante);
    toast({
      title: "Comprovante enviado com sucesso!",
      description: "Agradecemos sua contribuição.",
    });
    // Resetar o formulário
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      valor: "",
      tipo: "dízimo",
      metodo: "",
      observacoes: ""
    });
    setComprovante(null);
  };

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Dízimos e Ofertas</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Contribua com a obra de Deus através de seus dízimos e ofertas
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Tabs defaultValue="pix">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="pix">PIX</TabsTrigger>
              <TabsTrigger value="transferencia">Transferência</TabsTrigger>
              <TabsTrigger value="presencial">Presencial</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pix" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <QrCode className="h-5 w-5 text-primary" />
                    <CardTitle>Contribua via PIX</CardTitle>
                  </div>
                  <CardDescription>
                    Faça sua contribuição de forma rápida e segura utilizando o PIX
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="relative h-64 w-64 bg-white p-4 rounded-lg">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                      alt="QR Code PIX"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Chave PIX (CNPJ)</Label>
                      <div className="flex">
                        <Input value="00.000.000/0000-00" readOnly className="rounded-r-none" />
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="rounded-l-none border-l-0"
                          onClick={handleCopyPix}
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Banco</Label>
                      <Input value="Banco X" readOnly />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Beneficiário</Label>
                      <Input value="Igreja ADEV 11" readOnly />
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>1. Abra o aplicativo do seu banco</p>
                      <p>2. Escolha a opção PIX</p>
                      <p>3. Escaneie o QR Code ou copie a chave PIX</p>
                      <p>4. Informe o valor e finalize a transação</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Enviar Comprovante</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Enviar Comprovante</DialogTitle>
                        <DialogDescription>
                          Preencha os dados abaixo e anexe o comprovante da sua contribuição.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
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
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="telefone">Telefone</Label>
                            <Input 
                              id="telefone" 
                              placeholder="(00) 00000-0000" 
                              value={formData.telefone}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="valor">Valor (R$)</Label>
                            <Input 
                              id="valor" 
                              type="number" 
                              placeholder="0,00" 
                              value={formData.valor}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="tipo">Tipo de Contribuição</Label>
                            <Select defaultValue={formData.tipo} onValueChange={(value) => handleSelectChange("tipo", value)}>
                              <SelectTrigger id="tipo">
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dízimo">Dízimo</SelectItem>
                                <SelectItem value="oferta">Oferta</SelectItem>
                                <SelectItem value="missões">Missões</SelectItem>
                                <SelectItem value="construção">Construção</SelectItem>
                                <SelectItem value="ação social">Ação Social</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="metodo">Método de Pagamento</Label>
                            <Select onValueChange={(value) => handleSelectChange("metodo", value)}>
                              <SelectTrigger id="metodo">
                                <SelectValue placeholder="Selecione o método" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pix">PIX</SelectItem>
                                <SelectItem value="transferência">Transferência Bancária</SelectItem>
                                <SelectItem value="depósito">Depósito</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="comprovante">Comprovante</Label>
                          <Input 
                            id="comprovante" 
                            type="file" 
                            accept="image/*,.pdf" 
                            onChange={handleFileChange}
                          />
                          <p className="text-xs text-muted-foreground">
                            Formatos aceitos: JPG, PNG, PDF. Tamanho máximo: 5MB.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="observacoes">Observações (opcional)</Label>
                          <Textarea 
                            id="observacoes" 
                            placeholder="Informações adicionais sobre sua contribuição" 
                            value={formData.observacoes}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button type="submit" onClick={handleSubmit}>Enviar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="transferencia" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Landmark className="h-5 w-5 text-primary" />
                    <CardTitle>Transferência Bancária</CardTitle>
                  </div>
                  <CardDescription>
                    Faça sua contribuição através de transferência ou depósito bancário
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Banco</Label>
                        <Input value="Banco ADEV" readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>Agência</Label>
                        <Input value="0001" readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>Conta Corrente</Label>
                        <Input value="12345-6" readOnly />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Titular</Label>
                        <Input value="Igreja ADEV 11" readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>CNPJ</Label>
                        <Input value="00.000.000/0001-00" readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>Tipo de Conta</Label>
                        <Input value="Conta Corrente" readOnly />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      Após realizar a transferência ou depósito, envie o comprovante através do botão abaixo.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Enviar Comprovante</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Enviar Comprovante</DialogTitle>
                        <DialogDescription>
                          Preencha os dados abaixo e anexe o comprovante da sua contribuição.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
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
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="telefone">Telefone</Label>
                            <Input 
                              id="telefone" 
                              placeholder="(00) 00000-0000" 
                              value={formData.telefone}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="valor">Valor (R$)</Label>
                            <Input 
                              id="valor" 
                              type="number" 
                              placeholder="0,00" 
                              value={formData.valor}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="tipo">Tipo de Contribuição</Label>
                            <Select defaultValue={formData.tipo} onValueChange={(value) => handleSelectChange("tipo", value)}>
                              <SelectTrigger id="tipo">
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dízimo">Dízimo</SelectItem>
                                <SelectItem value="oferta">Oferta</SelectItem>
                                <SelectItem value="missões">Missões</SelectItem>
                                <SelectItem value="construção">Construção</SelectItem>
                                <SelectItem value="ação social">Ação Social</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="metodo">Método de Pagamento</Label>
                            <Select defaultValue="transferência" onValueChange={(value) => handleSelectChange("metodo", value)}>
                              <SelectTrigger id="metodo">
                                <SelectValue placeholder="Selecione o método" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pix">PIX</SelectItem>
                                <SelectItem value="transferência">Transferência Bancária</SelectItem>
                                <SelectItem value="depósito">Depósito</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="comprovante">Comprovante</Label>
                          <Input 
                            id="comprovante" 
                            type="file" 
                            accept="image/*,.pdf" 
                            onChange={handleFileChange}
                          />
                          <p className="text-xs text-muted-foreground">
                            Formatos aceitos: JPG, PNG, PDF. Tamanho máximo: 5MB.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="observacoes">Observações (opcional)</Label>
                          <Textarea 
                            id="observacoes" 
                            placeholder="Informações adicionais sobre sua contribuição" 
                            value={formData.observacoes}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button type="submit" onClick={handleSubmit}>Enviar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="presencial" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <CardTitle>Contribuição Presencial</CardTitle>
                  </div>
                  <CardDescription>
                    Informações sobre como contribuir presencialmente na igreja
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      <h3 className="font-medium mb-2">Horários de Culto</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex justify-between">
                          <span>Terça-feira:</span>
                          <span>20:00</span>
                        </li>
                      <li className="flex justify-between">
                          <span>Quinta-feira:</span>
                          <span>20:00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Domingo (manhã):</span>
                          <span>09:00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Domingo (noite):</span>
                          <span>18:00</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Formas de Contribuição Presencial</h3>
                      <p className="text-sm text-muted-foreground">
                        Durante os cultos, você pode dizimar ou ofertar, tendo opção de ser em dinheiro ou pix. 
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Métodos de Pagamento Aceitos</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span>Dinheiro</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Cartão de Crédito</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Cartão de Débito</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <QrCode className="h-4 w-4" />
                          <span>PIX (via QR Code)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ver Localização da Igreja
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>
                Dúvidas comuns sobre dízimos e ofertas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>O que é o dízimo?</AccordionTrigger>
                  <AccordionContent>
                    O dízimo representa 10% de tudo o que ganhamos e é uma forma de reconhecermos que tudo vem de Deus. É um princípio bíblico encontrado em passagens como Malaquias 3:10.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Qual a diferença entre dízimo e oferta?</AccordionTrigger>
                  <AccordionContent>
                    O dízimo corresponde a 10% dos nossos ganhos e é um mandamento bíblico. Já a oferta é uma contribuição voluntária, diferente do dízimo, cujo valor é determinado pelo ofertante conforme seu coração.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Como a igreja utiliza os recursos?</AccordionTrigger>
                  <AccordionContent>
                    Os recursos são utilizados para manutenção da igreja (aluguel, contas, equipamentos), projetos de evangelismo, missões e outras atividades ministeriais.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Posso direcionar minha oferta?</AccordionTrigger>
                  <AccordionContent>
                    Sim! Além do dízimo, você pode direcionar suas ofertas para áreas específicas como missões, finalização dos custos da construção do templo, cesta do amor ou projetos específicos direcionado pelo nosso Pr. Reginaldo. Basta informar no momento da contribuição quando envia o comprovante.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Recebo comprovante para imposto de renda?</AccordionTrigger>
                  <AccordionContent>
                    //Ver se é necessário
                   Sim. A igreja fornece declaração anual de doações para fins de dedução no Imposto de Renda. Para isso, é importante que suas contribuições sejam identificadas com seu CPF.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
              <div className="bg-muted p-4 rounded-md w-full">
                <h3 className="font-medium mb-2">Precisa de ajuda?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Se você tiver dúvidas sobre como contribuir, entre em contato com nossa equipe pelas redes sociais.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Princípios Bíblicos</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            O que a Bíblia nos ensina sobre dízimos e ofertas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Malaquias 3:10</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="italic text-muted-foreground mb-4">
                "Trazei todos os dízimos à casa do tesouro, para que haja mantimento na minha casa; e provai-me nisto, diz o Senhor dos Exércitos, se eu não vos abrir as janelas do céu e não derramar sobre vós uma bênção tal, que dela vos advenha a maior abastança."
              </p>
              <p className="text-sm">
                Deus nos convida a provar sua fidelidade através do dízimo, prometendo bênçãos abundantes para aqueles que são fiéis.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>2 Coríntios 9:7</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="italic text-muted-foreground mb-4">
                "Cada um contribua segundo propôs no seu coração, não com tristeza ou por necessidade; porque Deus ama ao que dá com alegria."
              </p>
              <p className="text-sm">
                Nossas contribuições devem ser feitas com alegria e generosidade, não por obrigação ou pressão, mas como uma expressão de gratidão a Deus.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Provérbios 3:9-10</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="italic text-muted-foreground mb-4">
                "Honra ao Senhor com os teus bens e com as primícias de toda a tua renda; e se encherão fartamente os teus celeiros, e transbordarão de vinho os teus lagares."
              </p>
              <p className="text-sm">
                Honrar a Deus com nossas finanças é um princípio de sabedoria que traz bênçãos para nossa vida.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Seja um Contribuinte Fiel</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          Sua contribuição é fundamental para mantermos e expandirmos o trabalho da igreja. Juntos, podemos alcançar mais vidas para Cristo.
        </p>
        <Button size="lg" className="text-base flex items-center gap-2">
          Contribuir Agora <ArrowRight className="h-4 w-4" />
        </Button>
      </section>
    </div>
  );
}