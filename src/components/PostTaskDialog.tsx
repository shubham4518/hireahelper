import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const categories = [
  "Cleaning", "Moving", "Delivery", "Handyman", "Gardening",
  "Painting", "Assembly", "Errands", "Other",
];

const taskSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(1000),
  budget: z.coerce.number().min(1, "Budget must be at least $1").max(100000),
  location: z.string().trim().min(2, "Location is required").max(200),
  category: z.string().min(1, "Please select a category"),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface PostTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTaskCreated?: () => void;
}

const PostTaskDialog = ({ open, onOpenChange, onTaskCreated }: PostTaskDialogProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "", description: "", budget: undefined as any, location: "", category: "" },
  });

  const onSubmit = async (values: TaskFormValues) => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.from("tasks").insert({
      user_id: user.id,
      title: values.title,
      description: values.description,
      budget: values.budget,
      location: values.location,
      category: values.category,
    } as any);

    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Task posted!", description: "Your task is now live." });
      form.reset();
      onOpenChange(false);
      onTaskCreated?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Post a New Task</DialogTitle>
          <DialogDescription>Fill in the details to find help for your task.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl><Input placeholder="e.g. Help me move furniture" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea placeholder="Describe your task in detail..." rows={3} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="budget" render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget ($)</FormLabel>
                  <FormControl><Input type="number" placeholder="50" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="location" render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl><Input placeholder="e.g. Downtown, New York" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <Button type="submit" disabled={loading} className="w-full gradient-brand text-primary-foreground hover:opacity-90">
              {loading ? "Posting..." : "Post Task"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PostTaskDialog;
