
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface NewTableModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTable: (table: { name: string; capacity: number; sector: string }) => void;
}

const NewTableModal = ({ open, onOpenChange, onAddTable }: NewTableModalProps) => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState(4);
  const [sector, setSector] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && sector) {
      onAddTable({ name, capacity, sector });
      setName('');
      setCapacity(4);
      setSector('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-orange-500" />
            Nova Mesa
          </DialogTitle>
          <DialogDescription>
            Adicione uma nova mesa ao seu restaurante
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Mesa</Label>
            <Input
              id="name"
              placeholder="Ex: Mesa 1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacidade</Label>
            <Select value={capacity.toString()} onValueChange={(value) => setCapacity(Number(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 pessoas</SelectItem>
                <SelectItem value="4">4 pessoas</SelectItem>
                <SelectItem value="6">6 pessoas</SelectItem>
                <SelectItem value="8">8 pessoas</SelectItem>
                <SelectItem value="10">10 pessoas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sector">Setor</Label>
            <Select value={sector} onValueChange={setSector}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interno">Interno</SelectItem>
                <SelectItem value="externo">Externo</SelectItem>
                <SelectItem value="varanda">Varanda</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Adicionar Mesa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTableModal;
