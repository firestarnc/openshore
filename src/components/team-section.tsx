'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { fetchTeamMembers, getTeamImageUrl, type TeamMember } from "@/lib/team";

type TeamMemberCard = TeamMember & {
  imageUrl: string | null;
};

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadTeamMembers() {
      try {
        const data = await fetchTeamMembers();

        if (!mounted) {
          return;
        }

        setTeamMembers(
          data.map((member) => ({
            ...member,
            imageUrl: getTeamImageUrl(member.image_path),
          }))
        );
      } catch (loadError) {
        if (!mounted) {
          return;
        }

        console.error(loadError);
        setError("We couldn't load the team profiles right now.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadTeamMembers();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-24 px-6 bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C19A6B] mb-4 block">
            Meet The Team
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-black leading-tight mb-6">
            The people behind the calm, craft, and coordination.
          </h2>
          <p className="text-gray-600 text-lg font-light leading-relaxed max-w-2xl">
            Open Shore runs on a balance of creative direction, client care, and dependable
            operations. Meet the team shaping each experience inside the studio.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse border border-neutral-100 bg-neutral-50 p-5"
              >
                <div className="aspect-4/5 bg-neutral-200 mb-5" />
                <div className="h-4 bg-neutral-200 w-2/3 mb-3" />
                <div className="h-3 bg-neutral-200 w-1/2 mb-5" />
                <div className="space-y-2">
                  <div className="h-3 bg-neutral-200 w-full" />
                  <div className="h-3 bg-neutral-200 w-full" />
                  <div className="h-3 bg-neutral-200 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="border border-[#C19A6B]/20 bg-[#C19A6B]/5 px-8 py-10 max-w-3xl">
            <p className="text-sm font-bold tracking-[0.2em] uppercase text-[#C19A6B] mb-3">
              Team Unavailable
            </p>
            <p className="text-gray-700 text-lg font-light leading-relaxed">{error}</p>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start bg-neutral-50 border border-neutral-100 p-8 md:p-12">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#C19A6B] mb-4">
                Profiles Coming In
              </p>
              <h3 className="text-3xl font-serif text-black mb-5">
                Upload the team images in Supabase and the profiles will appear here.
              </h3>
              <p className="text-gray-600 text-lg font-light leading-relaxed">
                This section is already connected to the <span className="font-medium text-black">team_members</span>
                table and the <span className="font-medium text-black">team-images</span> bucket.
              </p>
            </div>
            <div className="border-l border-[#C19A6B]/20 lg:pl-10">
              <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
                Add rows for each team member with a matching image path, then publish them by
                setting <span className="font-medium text-black">is_active</span> to true.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.2em] uppercase text-black hover:text-[#C19A6B] transition-colors"
              >
                Reach Out
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
            {teamMembers.map((member, index) => (
              <motion.article
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`group ${index % 2 === 1 ? "xl:translate-y-12" : ""}`}
              >
                <div className="relative overflow-hidden bg-neutral-100 aspect-4/5 mb-6">
                  {member.imageUrl ? (
                    <>
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#C19A6B]/10 px-8 text-center">
                      <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#C19A6B]">
                        Image Pending
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t border-neutral-200 pt-5">
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#C19A6B] mb-3">
                    {member.role}
                  </p>
                  <h3 className="text-3xl font-serif text-black mb-4 leading-tight">{member.name}</h3>
                  <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}