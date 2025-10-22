import React from 'react'
import { Badge } from './ui/badge'
import { FilterType } from '@/lib/data'
import { Button } from './ui/button'
import { Filter } from 'lucide-react'
import { Check } from "lucide-react"
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


const StatsAndFilter = ({completedTaskCount = 0, activeTaskCount = 0, cancelTaskCount = 0, filter = 'all'}) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(filter)
  
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
      <div className="flex gap-3 size-8">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {activeTaskCount} {FilterType.find((framework) => framework.value === 'active')?.label}
        </Badge>

        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {completedTaskCount} {FilterType.find((framework) => framework.value === 'completed')?.label}

        </Badge>

        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {cancelTaskCount} {FilterType.find((framework) => framework.value === 'canceled')?.label}

        </Badge>
      </div>
      <div className="flex flex-col gap-2 sm:flex-rowv text-transparent bg-primary bg-clip-text">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="filter"
              role="combobox"
              aria-expanded={open}
              className="w-[145px] justify-between"
            >
              {value ? (
                <span className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  {FilterType.find((framework) => framework.value === value)?.label}
                </span>
              ) : (
                "Select Filter ..."
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[145px] p-0">
            <Command>
              <CommandInput placeholder="Select Filter..." className="h-9" />
              <CommandList>
                <CommandEmpty>No filter found.</CommandEmpty>
                <CommandGroup>
                  {FilterType.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? value : currentValue)
                        setOpen(false)
                      }}
                    >
                      {framework.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === framework.value ? "opacity-100" : "opacity-0"
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

    </div>
  )
}

export default StatsAndFilter