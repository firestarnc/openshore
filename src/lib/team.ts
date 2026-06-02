import { supabase } from "@/lib/supabase";

export const TEAM_IMAGE_BUCKET = "team-images";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_path: string | null;
  sort_order: number;
  is_active: boolean;
};

export async function fetchTeamMembers() {
  const { data, error } = await supabase
    .from("team_members")
    .select("id, name, role, bio, image_path, sort_order, is_active")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  // Guard against accidental duplicate rows (for example after re-running seed SQL)
  // by keeping the first row for each unique name in sorted order.
  const uniqueByName = new Map<string, TeamMember>();

  for (const member of (data ?? []) as TeamMember[]) {
    const key = member.name.trim().toLowerCase();
    if (!uniqueByName.has(key)) {
      uniqueByName.set(key, member);
    }
  }

  return Array.from(uniqueByName.values());
}

export function getTeamImageUrl(imagePath: string | null) {
  if (!imagePath) {
    return null;
  }

  const { data } = supabase.storage.from(TEAM_IMAGE_BUCKET).getPublicUrl(imagePath);
  return data.publicUrl;
}