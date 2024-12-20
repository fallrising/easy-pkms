import { render, screen, fireEvent } from "@testing-library/react"
import { NoteList } from "@/components/note-list"
import { getNotes } from "@/lib/api"

// Mock the API function
jest.mock("@/lib/api", () => ({
  getNotes: jest.fn(),
}))

describe("NoteList", () => {
  const mockNotes = [
    {
      id: "1",
      title: "Test Note 1",
      content: "This is test note 1",
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
    },
    {
      id: "2",
      title: "Test Note 2",
      content: "This is test note 2",
      createdAt: "2023-01-02T00:00:00.000Z",
      updatedAt: "2023-01-02T00:00:00.000Z",
    },
  ]

  beforeEach(() => {
    ;(getNotes as jest.Mock).mockResolvedValue(mockNotes)
  })

  it("renders the note list", async () => {
    render(<NoteList />)
    
    // Wait for the notes to be loaded
    const note1 = await screen.findByText("Test Note 1")
    const note2 = await screen.findByText("Test Note 2")
    
    expect(note1).toBeInTheDocument()
    expect(note2).toBeInTheDocument()
  })

  it("filters notes based on search input", async () => {
    render(<NoteList />)
    
    // Wait for the notes to be loaded
    await screen.findByText("Test Note 1")
    
    const searchInput = screen.getByPlaceholderText("Search notes...")
    fireEvent.change(searchInput, { target: { value: "note 2" } })
    
    expect(screen.queryByText("Test Note 1")).not.toBeInTheDocument()
    expect(screen.getByText("Test Note 2")).toBeInTheDocument()
  })

  it("sorts notes by title", async () => {
    render(<NoteList />)
    
    // Wait for the notes to be loaded
    await screen.findByText("Test Note 1")
    
    const sortSelect = screen.getByRole("combobox")
    fireEvent.change(sortSelect, { target: { value: "title" } })
    
    const noteItems = screen.getAllByRole("article")
    expect(noteItems[0]).toHaveTextContent("Test Note 1")
    expect(noteItems[1]).toHaveTextContent("Test Note 2")
  })
})

