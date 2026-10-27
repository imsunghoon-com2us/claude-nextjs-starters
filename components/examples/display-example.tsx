import { Info, TriangleAlert } from "lucide-react"

import { ExampleGroup, ExampleSection } from "@/components/examples/example-section"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export function DisplayExample() {
  return (
    <ExampleSection id="display" title="표시" description="Badge, Avatar, Alert, Separator, Skeleton">
      <ExampleGroup label="Badge">
        <Badge>default</Badge>
        <Badge variant="secondary">secondary</Badge>
        <Badge variant="outline">outline</Badge>
        <Badge variant="destructive">destructive</Badge>
      </ExampleGroup>
      <ExampleGroup label="Avatar">
        {["김", "이", "박"].map((n) => (
          <Avatar key={n}><AvatarFallback>{n}</AvatarFallback></Avatar>
        ))}
      </ExampleGroup>
      <Separator />
      <div className="grid gap-3 sm:grid-cols-2">
        <Alert>
          <Info />
          <AlertTitle>안내</AlertTitle>
          <AlertDescription>기본 Alert 입니다.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>오류</AlertTitle>
          <AlertDescription>destructive Alert 입니다.</AlertDescription>
        </Alert>
      </div>
      <ExampleGroup label="Skeleton">
        <div className="flex items-center gap-3">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </ExampleGroup>
    </ExampleSection>
  )
}
