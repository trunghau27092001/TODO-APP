import React from "react";
import { Button } from './ui/button'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import { options } from "@/lib/data";


const DateTimeFilter = ({dateQuery,setDateQuery}) => {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex flex-col gap-2 sm:flex-row ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size = 'lg'
            variant="filter"
            role="combobox"
            aria-expanded={open}
            className="flex items-center justify-between"
          >
            {dateQuery ? (
              <span className="flex items-center gap-2">
                {
                  options.find((option) => option.value === dateQuery)
                    ?.label
                }
              </span>
            ) : (
              "Select Filter ..."
            )}
            <ChevronsUpDown className="opacity-100" />

          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[145px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setDateQuery(
                        currentValue === dateQuery? dateQuery : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        dateQuery === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateTimeFilter;
