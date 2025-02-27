"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, UserPlus, Edit, Trash2, Eye, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

// Dados de exemplo para membros
const membersData = [
  { id: 1, nome: "Dilson Pereira", email: "dilson@gmail.com", telefone: "(61) 99999-9999", departamento: "Mile e Multímidia", dataCadastro: "15/01/2025", endereco: "Setor de Mansões", cidade: "Sobradinho II", estado: "DF", cep: "73300-00", dataNascimento: "1985-05-10", observacoes: "Líder Múltimida" },
  { id: 2, nome: "David Santos", email: "david@gmail.com", telefone: "(61) 99999-9999", departamento: "Multímidia", dataCadastro: "15/01/2025", endereco: "Ar 11 Conj 01", cidade: "Sobradinho II", estado: "DF", cep: "73300-000", dataNascimento: "1985-05-10", observacoes: "Líder Múltimida"},
  { id: 3, nome: "Sarah Borges", email: "sarah@email.com", telefone: "(61) 99999-9999", departamento: "Multímidia", dataCadastro: "15/01/2025", endereco: "Setor de Mansões", cidade: "Sobradinho II", estado: "DF", cep: "73300-000", dataNascimento: "1985-05-10"},
  { id: 4, nome: "Ana Karina", email: "ana@email.com", telefone: "(61) 99999-9999", departamento: "Multímidia", dataCadastro: "15/01/2025", endereco: "Ar 11 Conj 01", cidade: "Sobradinho II", estado: "DF", cep: "73300-000", dataNascimento: "1985-05-10"},
  { id: 5, nome: "Carlos Ferreira", email: "carlos@email.com", telefone: "(61) 99999-9999", departamento: "Mile", dataCadastro: "15/01/2025", endereco: "Ar 11 Conj 01", cidade: "Sobradinho II", estado: "DF", cep: "73300-000", dataNascimento: "1985-05-10"},
  { id: 6, nome: "Lucas Leandro", email: "lucas@email.com", telefone: "(61) 99999-9999", departamento: "Multímidia", dataCadastro: "15/01/2025", endereco: "Ar 11 Conj 01", cidade: "Sobradinho II", estado: "DF", cep: "73300-000", dataNascimento: "1985-05-10"},
  { id: 7, nome: "Reginaldo Pereira", email: "regis@email.com", telefone: "(61) 99999-9999", departamento: "Louvor e Multímidia", dataCadastro: "15/01/2025", endereco: "Ar 11 Conj 01", cidade: "Sobradinho II", estado: "DF", cep: "73300-000", dataNascimento: "1985-05-10", observacoes: "Pastor de Setor" },
  { id: 8, nome: "André Victor", email: "victor@email.com", telefone: "(61) 99999-9999", departamento: "Louvor e Multímidia", dataCadastro: "15/01/2025", endereco: "Av Cent Conj 14 Casa 05", cidade: "Sobradinho II", estado: "DF", cep: "73300-000", dataNascimento: "1999-07-24"},
];

// Agrupar membros por departamento
const membersByDepartment = membersData.reduce((acc, member) => {
  if (!acc[member.departamento]) {
    acc[member.departamento] = [];
  }
  acc[member.departamento].push(member);
  return acc;
}, {} as Record<string, typeof membersData>);

export default function MembrosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [viewMember, setViewMember] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    departamento: "",
    observacoes: ""
  });

  const filteredMembers = membersData.filter(member => 
    member.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewMember = (member: any) => {
    setViewMember(member);
    setIsViewDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    // Aqui seria implementada a lógica para salvar o novo membro
    console.log("Novo membro:", formData);
    setOpenDialog(false);
    // Resetar o formulário
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      dataNascimento: "",
      endereco: "",
      cidade: "",
      estado: "",
      cep: "",
      departamento: "",
      observacoes: ""
    });
  };

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Membros</h1>
          <p className="text-muted-foreground">
            Gerencie os membros da igreja ADEV 11
          </p>
        </div>
        
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" /> Cadastrar Membro
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Membro</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo membro para cadastrá-lo no sistema.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input 
                    id="nome" 
                    placeholder="Nome completo" 
                    value={formData.nome}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="email@exemplo.com" 
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
                  <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                  <Input 
                    id="dataNascimento" 
                    type="date" 
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input 
                    id="endereco" 
                    placeholder="Rua, número, bairro" 
                    value={formData.endereco}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input 
                    id="cidade" 
                    placeholder="Cidade" 
                    value={formData.cidade}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Input 
                    id="estado" 
                    placeholder="Estado" 
                    value={formData.estado}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input 
                    id="cep" 
                    placeholder="00000-000" 
                    value={formData.cep}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, departamento: value }))}>
                  <SelectTrigger id="departamento">
                    <SelectValue placeholder="Selecione um departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mile">Mile</SelectItem>
                    <SelectItem value="Kemuel">Kemuel</SelectItem>
                    <SelectItem value="Samah">Samah</SelectItem>
                    <SelectItem value="Gileade">Gileade</SelectItem>
                    <SelectItem value="Silóe">Silóe</SelectItem>
                    <SelectItem value="Discipulado">Discipulado</SelectItem>
                    <SelectItem value="Missões">Missões</SelectItem>
                    <SelectItem value="Multímidia">Multímidia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea 
                  id="observacoes" 
                  placeholder="Observações adicionais"
                  value={formData.observacoes}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>Cadastrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Dialog para visualizar detalhes do membro */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Membro</DialogTitle>
              <DialogDescription>
                Informações completas do membro cadastrado.
              </DialogDescription>
            </DialogHeader>
            
            {viewMember && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Nome Completo</h3>
                    <p className="text-base">{viewMember.nome}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">E-mail</h3>
                    <p className="text-base">{viewMember.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Telefone</h3>
                    <p className="text-base">{viewMember.telefone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Data de Nascimento</h3>
                    <p className="text-base">{viewMember.dataNascimento}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Endereço</h3>
                  <p className="text-base">{viewMember.endereco}, {viewMember.cidade} - {viewMember.estado}, {viewMember.cep}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Departamento</h3>
                    <p className="text-base">{viewMember.departamento}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Data de Cadastro</h3>
                    <p className="text-base">{viewMember.dataCadastro}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Observações</h3>
                  <p className="text-base">{viewMember.observacoes}</p>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Fechar</Button>
              <Button>Editar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="lista">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="lista">Lista de Membros</TabsTrigger>
          <TabsTrigger value="departamentos">Por Departamentos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lista">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <CardTitle>Todos os Membros</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar membros..."
                    className="pl-8 w-full md:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Data de Cadastro</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.nome}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.telefone}</TableCell>
                      <TableCell>{member.departamento}</TableCell>
                      <TableCell>{member.dataCadastro}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewMember(member)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Mostrando {filteredMembers.length} de {membersData.length} membros
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Próximo
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="departamentos">
          <div className="space-y-8">
            {Object.entries(membersByDepartment).map(([departamento, membros]) => (
              <Card key={departamento}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {departamento}
                      <Badge variant="outline">{membros.length}</Badge>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {membros.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.nome}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{member.telefone}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleViewMember(member)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}