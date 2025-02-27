"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { DollarSign, Plus, ArrowUpRight, ArrowDownRight, Trash2, Edit, Filter, Download } from "lucide-react";

// Dados de exemplo para finanças
const transacoesData = [
  { id: 1, data: "05/01/2025", tipo: "Entrada", categoria: "Dízimos", valor: 5000, descricao: "Dízimos do primeiro domingo" },
  { id: 2, data: "10/01/2025", tipo: "Saída", categoria: "Aluguel", valor: 3000, descricao: "Aluguel do templo" },
  { id: 3, data: "15/01/2025", tipo: "Entrada", categoria: "Ofertas", valor: 2500, descricao: "Ofertas do segundo domingo" },
  { id: 4, data: "20/01/2025", tipo: "Saída", categoria: "Água/Luz", valor: 800, descricao: "Contas de água e luz" },
  { id: 5, data: "25/01/2025", tipo: "Entrada", categoria: "Dízimos", valor: 4800, descricao: "Dízimos do terceiro domingo" },
  { id: 6, data: "28/01/2025", tipo: "Saída", categoria: "Material de Estudo", valor: 1200, descricao: "Material para escola dominical" },
  { id: 7, data: "05/02/2025", tipo: "Entrada", categoria: "Dízimos", valor: 5200, descricao: "Dízimos do primeiro domingo" },
  { id: 8, data: "10/02/2025", tipo: "Saída", categoria: "Cadeiras Templo", valor: 3000, descricao: "Cadeiras Templo" },
  { id: 9, data: "15/02/2025", tipo: "Entrada", categoria: "Ofertas", valor: 2700, descricao: "Ofertas do segundo domingo" },
  { id: 10, data: "20/02/2025", tipo: "Saída", categoria: "Água/Luz", valor: 850, descricao: "Contas de água e luz" },
];

// Dados para o gráfico de pizza
const pieData = [
  { name: "Dízimos", value: 15000 },
  { name: "Ofertas", value: 5200 },
  { name: "Departamentos", value: 3000 },
  { name: "Eventos", value: 1800 },
];

// Dados para o gráfico de barras
const barData = [
  { name: "Jan", entradas: 12300, saidas: 5000 },
  { name: "Fev", entradas: 13500, saidas: 5200 },
  { name: "Mar", entradas: 11800, saidas: 4800 },
  { name: "Abr", entradas: 12500, saidas: 5100 },
  { name: "Mai", entradas: 13200, saidas: 5300 },
  { name: "Jun", entradas: 14000, saidas: 5500 },
];

// Cores para o gráfico de pizza
const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

export default function FinancasPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [transactionType, setTransactionType] = useState<"Entrada" | "Saída">("Entrada");
  const [formData, setFormData] = useState({
    data: "",
    tipo: "Entrada",
    categoria: "",
    valor: "",
    descricao: ""
  });

  // Calcular totais
  const totalEntradas = transacoesData
    .filter(t => t.tipo === "Entrada")
    .reduce((acc, t) => acc + t.valor, 0);
  
  const totalSaidas = transacoesData
    .filter(t => t.tipo === "Saída")
    .reduce((acc, t) => acc + t.valor, 0);
  
  const saldo = totalEntradas - totalSaidas;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    // Aqui seria implementada a lógica para salvar a nova transação
    console.log("Nova transação:", formData);
    setOpenDialog(false);
    // Resetar o formulário
    setFormData({
      data: "",
      tipo: "Entrada",
      categoria: "",
      valor: "",
      descricao: ""
    });
  };

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Finanças</h1>
          <p className="text-muted-foreground">
            Gerencie as finanças da igreja
          </p>
        </div>
        
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Nova Transação
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Nova Transação</DialogTitle>
              <DialogDescription>
                Preencha os detalhes da transação financeira.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data">Data</Label>
                  <Input 
                    id="data" 
                    type="date" 
                    value={formData.data}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select 
                    defaultValue={transactionType} 
                    onValueChange={(value) => {
                      setTransactionType(value as "Entrada" | "Saída");
                      setFormData(prev => ({ ...prev, tipo: value }));
                    }}
                  >
                    <SelectTrigger id="tipo">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entrada">Entrada</SelectItem>
                      <SelectItem value="Saída">Saída</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, categoria: value }))}>
                    <SelectTrigger id="categoria">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {transactionType === "Entrada" ? (
                        <>
                          <SelectItem value="Dízimos">Dízimos</SelectItem>
                          <SelectItem value="Ofertas">Ofertas</SelectItem>
                          <SelectItem value="Doações">Doações</SelectItem>
                          <SelectItem value="Eventos">Eventos</SelectItem>
                          <SelectItem value="Outros">Outros</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="Aluguel">Aluguel</SelectItem>
                          <SelectItem value="Água/Luz">Água/Luz</SelectItem>
                          <SelectItem value="Material">Material</SelectItem>
                          <SelectItem value="Manutenção">Manutenção</SelectItem>
                          <SelectItem value="Salários">Salários</SelectItem>
                          <SelectItem value="Missões">Missões</SelectItem>
                          <SelectItem value="Outros">Outros</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
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
              
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea 
                  id="descricao" 
                  placeholder="Detalhes da transação" 
                  value={formData.descricao}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>Registrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total de Entradas</CardTitle>
            <CardDescription>Valor total recebido</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ArrowUpRight className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-2xl font-bold">R$ {totalEntradas.toLocaleString('pt-BR')}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total de Saídas</CardTitle>
            <CardDescription>Valor total de despesas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ArrowDownRight className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-2xl font-bold">R$ {totalSaidas.toLocaleString('pt-BR')}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Saldo Atual</CardTitle>
            <CardDescription>Balanço financeiro</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">R$ {saldo.toLocaleString('pt-BR')}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="transacoes">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          <TabsTrigger value="graficos">Gráficos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transacoes">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle>Histórico de Transações</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" /> Filtrar
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="h-4 w-4" /> Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transacoesData.map((transacao) => (
                    <TableRow key={transacao.id}>
                      <TableCell>{transacao.data}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 ${
                          transacao.tipo === "Entrada" ? "text-green-500" : "text-red-500"
                        }`}>
                          {transacao.tipo === "Entrada" ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                          {transacao.tipo}
                        </span>
                      </TableCell>
                      <TableCell>{transacao.categoria}</TableCell>
                      <TableCell className="font-medium">
                        R$ {transacao.valor.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{transacao.descricao}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
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
                Mostrando {transacoesData.length} transações
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
        
        <TabsContent value="relatorios">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Relatório Mensal</CardTitle>
                <CardDescription>Resumo financeiro do mês atual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Dízimos</span>
                    <span>R$ 15.000,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Ofertas</span>
                    <span>R$ 5.200,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Oferta Maior</span>
                    <span>R$ 3.000,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Cantina Congresso</span>
                    <span>R$ 1.800,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Total de Entradas</span>
                    <span className="font-bold">R$ 25.000,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Obras</span>
                    <span>R$ 3.000,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Água/Luz</span>
                    <span>R$ 850,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Material EBD</span>
                    <span>R$ 1.200,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Cadeiras Templo</span>
                    <span>R$ 4.500,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Total de Saídas</span>
                    <span className="font-bold">R$ 9.550,00</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold">Saldo do Mês</span>
                    <span className="font-bold text-green-500">R$ 15.450,00</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Gerar PDF</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Relatório Anual</CardTitle>
                <CardDescription>Resumo financeiro do ano atual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Janeiro</span>
                    <span>R$ 7.300,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Fevereiro</span>
                    <span>R$ 8.300,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Março</span>
                    <span>R$ 7.000,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Abril</span>
                    <span>R$ 7.400,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Maio</span>
                    <span>R$ 7.900,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Junho</span>
                    <span>R$ 8.500,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Total de Entradas</span>
                    <span className="font-bold">R$ 46.400,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Total de Saídas</span>
                    <span className="font-bold">R$ 30.900,00</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold">Saldo do Ano</span>
                    <span className="font-bold text-green-500">R$ 15.500,00</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Gerar PDF</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="graficos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Entradas</CardTitle>
                <CardDescription>Por categoria</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Entradas vs Saídas</CardTitle>
                <CardDescription>Por mês</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                    <Legend />
                    <Bar dataKey="entradas" name="Entradas" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="saidas" name="Saídas" fill="hsl(var(--chart-3))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}