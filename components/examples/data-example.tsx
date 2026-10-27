import { ExampleSection } from "@/components/examples/example-section"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const rows = [
  { name: "Next.js", type: "프레임워크", status: "사용 중" },
  { name: "Tailwind CSS", type: "스타일", status: "사용 중" },
  { name: "shadcn/ui", type: "UI", status: "사용 중" },
]

export function DataExample() {
  return (
    <ExampleSection id="data" title="데이터" description="Tabs, Table, ScrollArea">
      <Tabs defaultValue="table">
        <TabsList>
          <TabsTrigger value="table">테이블</TabsTrigger>
          <TabsTrigger value="scroll">스크롤 영역</TabsTrigger>
        </TabsList>
        <TabsContent value="table" className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>종류</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.name}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell>{r.type}</TableCell>
                  <TableCell><Badge variant="secondary">{r.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="scroll" className="pt-4">
          <ScrollArea className="h-40 rounded-md border">
            <div className="space-y-2 p-4 text-sm">
              {Array.from({ length: 20 }).map((_, i) => (
                <p key={i}>스크롤 가능한 항목 {i + 1}</p>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </ExampleSection>
  )
}
