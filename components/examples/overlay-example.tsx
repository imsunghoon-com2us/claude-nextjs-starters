"use client"

import { ChevronDown } from "lucide-react"
import { toast } from "sonner"

import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { ExampleGroup, ExampleSection } from "@/components/examples/example-section"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function OverlayExample() {
  return (
    <ExampleSection id="overlay" title="오버레이" description="Dialog, ConfirmDialog, Popover, Tooltip, DropdownMenu, Sheet">
      <ExampleGroup label="클릭해서 열기">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>다이얼로그</DialogTitle>
              <DialogDescription>일반적인 모달 창입니다.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <ConfirmDialog
          trigger={<Button variant="destructive" />}
          title="정말 삭제할까요?"
          description="공통 ConfirmDialog 컴포넌트 예시입니다."
          confirmLabel="삭제"
          onConfirm={() => toast.success("삭제되었습니다.")}
        />

        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>Popover</PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>팝오버</PopoverTitle>
              <PopoverDescription>버튼 근처에 표시되는 작은 패널입니다.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            DropdownMenu <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>프로필</DropdownMenuItem>
            <DropdownMenuItem>설정</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>로그아웃</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>Sheet</SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>시트</SheetTitle>
              <SheetDescription>화면 가장자리에서 열리는 패널입니다.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" />}>마우스를 올려보세요</TooltipTrigger>
          <TooltipContent>툴팁 내용</TooltipContent>
        </Tooltip>
      </ExampleGroup>
    </ExampleSection>
  )
}
