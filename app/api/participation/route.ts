// import { NextRequest, NextResponse } from 'next/server'
// import prisma from "@/services/db"

// // POST /api/participation
// export async function POST(req: NextRequest) {
//     const { eventId } = await req.json()
//     const userId = session.user.id

//     if (!eventId || !userId) {
//       return NextResponse.json({ error: 'eventId ou userId manquant' }, { status: 400 })
//     }

//     // Vérifier si la participation existe déjà
//     const existing = await prisma.participation.findUnique({
//       where: { userId_eventId: { userId, eventId } }
//     })
//     if (existing) {
//       return NextResponse.json({ error: 'Déjà inscrit à cet événement' }, { status: 409 })
//     }

//     // Créer la participation
//     const participation = await prisma.participation.create({
//       data: { userId, eventId }
//     })
//     return NextResponse.json({ participation }, { status: 201 })
//   } catch (error) {
//     return NextResponse.json({ error: error?.message || 'Erreur serveur' }, { status: 500 })
//   }
// }
