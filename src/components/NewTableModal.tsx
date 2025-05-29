
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NewTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTable: (table: any) => void;
}

const NewTableModal = ({ isOpen, onClose, onCreateTable }: NewTableModalProps) => {
  const [tableData, setTableData] = useState({
    name: '',
    capacity: '',
    sector: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tableData.name && tableData.capacity && tableData.sector) {
      onCreateTable({
        id: Date.now(),
        name: tableData.name,
        capacity: parseInt(tableData.capacity),
        sector: tableData.sector,
        status: 'available'
      });
      setTableData({ name: '', capacity: '', sector: '' });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            🪑 Nova Mesa
          </DialogTitle>
          <DialogDescription>
            Adicione uma nova mesa ao seu restaurante
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome/Número da Mesa</Label>
            <Input
              id="name"
              placeholder="Ex: Mesa 10"
              value={tableData.name}
              onChange={(e) => setTableData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacidade (pessoas)</Label>
            <Input
              id="capacity"
              type="number"
              min="1"
              max="20"
              placeholder="4"
              value={tableData.capacity}
              onChange={(e) => setTableData(prev => ({ ...prev, capacity: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sector">Setor</Label>
            <Select value={tableData.sector} onValueChange={(value) => setTableData(prev => ({ ...prev, sector: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interno">🏠 Salão Interno</SelectItem>
                <SelectItem value="externo">🌳 Área Externa</SelectItem>
                <SelectItem value="vip">⭐ Área VIP</SelectItem>
                <SelectItem value="balcao">🥤 Balcão</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-orange-500 to-red-500">
              ✅ Criar Mesa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTableModal;
