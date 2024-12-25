// File Path: personal-info-manager/__tests__/stats-grid.test.tsx
import { render, screen } from "@testing-library/react"
import { StatsGrid } from "@/components/features/dashboard/stats-grid"

describe("StatsGrid", () => {
  it("renders all stat cards", () => {
    render(<StatsGrid />)
    
    expect(screen.getByText("Total Documents")).toBeInTheDocument()
    expect(screen.getByText("Quick Links")).toBeInTheDocument()
    expect(screen.getByText("Categories")).toBeInTheDocument()
    expect(screen.getByText("Favorites")).toBeInTheDocument()
  })

  it("displays correct stat values", () => {
    render(<StatsGrid />)
    
    expect(screen.getByText("34")).toBeInTheDocument()
    expect(screen.getByText("6")).toBeInTheDocument()
    expect(screen.getByText("12")).toBeInTheDocument()
    expect(screen.getByText("8")).toBeInTheDocument()
  })
})

