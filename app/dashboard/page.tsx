"use client";

import { Home, LayoutDashboard, Settings, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Dummy data for the table
const dummyData = [
  {
    id: "DV-2023-001",
    name: "John Smith",
    email: "john.smith@example.com",
    totalDiminishedValue: "$5,250.00",
  },
  {
    id: "DV-2023-002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    totalDiminishedValue: "$3,780.50",
  },
  {
    id: "DV-2023-003",
    name: "Michael Brown",
    email: "m.brown@example.com",
    totalDiminishedValue: "$7,120.75",
  },
  {
    id: "DV-2023-004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    totalDiminishedValue: "$4,890.25",
  },
  {
    id: "DV-2023-005",
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    totalDiminishedValue: "$6,340.00",
  },
  {
    id: "DV-2023-006",
    name: "Jennifer Lee",
    email: "j.lee@example.com",
    totalDiminishedValue: "$2,950.75",
  },
  {
    id: "DV-2023-007",
    name: "David Martinez",
    email: "d.martinez@example.com",
    totalDiminishedValue: "$8,120.50",
  },
  {
    id: "DV-2023-008",
    name: "Lisa Thompson",
    email: "l.thompson@example.com",
    totalDiminishedValue: "$5,670.25",
  },
  {
    id: "DV-2023-009",
    name: "James Anderson",
    email: "j.anderson@example.com",
    totalDiminishedValue: "$4,230.00",
  },
  {
    id: "DV-2023-010",
    name: "Patricia Garcia",
    email: "p.garcia@example.com",
    totalDiminishedValue: "$7,890.75",
  },
  {
    id: "DV-2023-011",
    name: "Thomas Wright",
    email: "t.wright@example.com",
    totalDiminishedValue: "$3,450.50",
  },
  {
    id: "DV-2023-012",
    name: "Nancy Clark",
    email: "n.clark@example.com",
    totalDiminishedValue: "$6,780.25",
  },
  {
    id: "DV-2023-013",
    name: "Daniel Lewis",
    email: "d.lewis@example.com",
    totalDiminishedValue: "$5,120.00",
  },
  {
    id: "DV-2023-014",
    name: "Karen Walker",
    email: "k.walker@example.com",
    totalDiminishedValue: "$4,670.75",
  },
  {
    id: "DV-2023-015",
    name: "Matthew Hall",
    email: "m.hall@example.com",
    totalDiminishedValue: "$8,340.50",
  },
];

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase";
import ChartPdfImage from "./components/ChartPdfImage";

// Add this function to fetch data from Supabase
const fetchDiminishedValueData = async (
  supabase,
  page = 1,
  itemsPerPage = 5
) => {
  try {
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    const { data, error, count } = await supabase
      .from("diminished_car_value")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Error fetching data:", error);
      return { data: [], count: 0, error };
    }

    return { data: data || [], count: count || 0, error: null };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { data: [], count: 0, error: err };
  }
};

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openLoader, setOpenLoader] = useState(false);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Load data on component mount and page change
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setOpenLoader(true);

      // You need to pass your supabase instance here
      // Assuming you have it available as a prop or imported
      const { data, count, error } = await fetchDiminishedValueData(
        supabase,
        currentPage,
        itemsPerPage
      );

      if (error) {
        setError(error);
        setCurrentItems([]);
        setTotalCount(0);
      } else {
        setCurrentItems(data);
        setTotalCount(count);
        setError(null);
      }

      setLoading(false);

    setTimeout(() => {
        setOpenLoader(false);
    }, 6000);
    };

    loadData();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleDownloadPDF = (id) => {
    // This would normally trigger a PDF download
    alert(`Downloading PDF for report ${id}`);
  };

  return (
    <div className="flex min-h-screen bg-background">
    {openLoader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-white p-6 shadow-lg flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-4"></div>
            </div>
        </div>
    )}
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
        <div className="flex h-14 items-center border-b px-4 font-semibold">
          <LayoutDashboard className="mr-2 h-5 w-5" />
          <span>Dashboard</span>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-4 py-2">
            <h2 className="mb-2 text-xs font-semibold text-muted-foreground">
              Navigation
            </h2>
            <div className="space-y-1">
              <Link
                href="#"
                className="flex items-center rounded-md bg-primary/10 px-3 py-2 text-sm font-medium text-primary"
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Users className="mr-2 h-4 w-4" />
                Clients
              </Link>
              <Link
                href="#"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-4 md:px-6">
          <h1 className="text-lg font-semibold">Diminished Value Reports</h1>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="rounded-lg border bg-card">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div>Loading...</div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-8 text-red-500">
                <div>Error loading data: {error.message}</div>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Total Diminished Value</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((item) => (
                      <TableRow key={item?.id}>
                        {console.log({item})}
                        <TableCell className="font-medium">
                          {item?.id}
                        </TableCell>
                        <TableCell>{item?.client_info?.name}</TableCell>
                        <TableCell>{item?.client_info?.email}</TableCell>
                        <TableCell>
                          $
                          {item?.totalDiminishedValue ||
                            Number(item?.estimated_diminished_value)?.toFixed(0)}
                          {/* {item?.totalDiminishedValue ||
                            item?.estimated_diminished_value} */}
                        </TableCell>
                        <TableCell className="text-right">
                          {/* <PDFDownloadLink
                            // document={<PDFDocument report={sampleReport} />}
                            document={<PDFDocument report={item} />}
                            fileName="diminished-value-report.pdf"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-md duration-200 border-2 font-semibold"
                            
                          >
                            {({ loading }) => (
                              <>
                                <Download size={18} />
                                <span>{loading ? 'Preparing...' : 'Download PDF'}</span>
                              </>
                            )}
                          </PDFDownloadLink> */}
                          <ChartPdfImage item={item} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex items-center justify-center py-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            currentPage > 1 && handlePageChange(currentPage - 1)
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {pageNumbers.map((number) => (
                        <PaginationItem key={number}>
                          <PaginationLink
                            onClick={() => handlePageChange(number)}
                            isActive={currentPage === number}
                          >
                            {number}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            currentPage < totalPages &&
                            handlePageChange(currentPage + 1)
                          }
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
